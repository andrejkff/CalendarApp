import { StyleSheet, View, Button, Text, Switch } from 'react-native';
import EmailInputComponent from '../../shared/inputs/email';
import PasswordInputComponent from '../../shared/inputs/password';
import ErrorComponent from '../../shared/error';
import { auth } from '../../../firebase';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { isBiometricAvailable, saveBiometricCredentials, getBiometricCredentials } from './_service';

type Mode = 'register' | 'login';

export default function RegisterLogin() {
  const [mode, setMode] = useState<Mode>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validityState, setValidityState] = useState<{ password: boolean, email: boolean}>({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bioAvailable, setBioAvailable] = useState(false);
  const [nextLoginUsingBio, setNextLoginUsingBio] = useState(false);

  async function initBiometricAuth() {
    const _bioAvailable = await isBiometricAvailable();
    setBioAvailable(_bioAvailable);
  }

  useEffect(() => {
    initBiometricAuth();
  }, []);

  function formIsValid (): boolean {
    return Object.values(validityState).every(value => value === true);
  }

  function submitDisabled(): boolean {
    return loading || !formIsValid();
  }

  async function submit() {
    if (loading) return;
    setLoading(true);
    setError('');
    const actionFn = mode === 'register' ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    actionFn(auth, email, password)
    .then(async () => {
      if (!bioAvailable || !nextLoginUsingBio) return;
      await saveBiometricCredentials(
        email,
        password,
      );
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    });
  };

  async function biometricLogin() {
    setLoading(true);
    try {
      const credentials = await getBiometricCredentials();
      if (!credentials) {
        setError('No biometric login was set up.');
        setLoading(false);
        return;
      }
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      setError(
        'Biometric login failed: ' + error,
      );
      setLoading(false);
    }
  }

  function changeMode(mode: Mode) {
    setError('');
    setMode(mode);
  }

  function switchToLoginUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Already have an account?</Text>
        <Button title="Log in" onPress={() => changeMode('login')} testID="switch-to-login-button" disabled={loading}/>
      </View>
    )
  };

  function switchToRegisterUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Do not have an account?</Text>
        <Button title="Register" onPress={() => changeMode('register')} testID="switch-to-register-button" disabled={loading}/>
      </View>
    )
  };

  function toggleNextLoginUsingBioUi() {
    return (
      <View style={styles.useBioToggleWrapper}>
        <Text>Use biometrics on next login</Text>
        <Switch onValueChange={setNextLoginUsingBio} value={nextLoginUsingBio} />
      </View>
    )
  }

  return (
    <View style={styles.container} testID="register-screen">
      <View style={styles.inputGroup}>
        <EmailInputComponent
          label="Email"
          onValueChange={setEmail}
          onValidityChange={(newValidity: boolean) => setValidityState(state => ({
            ...state,
            email: newValidity,
          }))}
        />
      </View>
      <View style={styles.inputGroup}>
        <PasswordInputComponent
          label="Password"
          onValueChange={setPassword}
          onValidityChange={(newValidity: boolean) => setValidityState(state => ({
            ...state,
            password: newValidity,
          }))}
        />
      </View>
      <Button
        title={mode === 'register' ? 'Sign up' : 'Log in'}
        disabled={submitDisabled()}
        onPress={submit}
        testID="submit-auth-button"
      />
      {bioAvailable && toggleNextLoginUsingBioUi()}
      {
        mode === 'login' && bioAvailable &&
        <Button title="Log in with fingerprint" onPress={biometricLogin} disabled={loading}/>
      }
      {mode === 'register' ? switchToLoginUi() : switchToRegisterUi()}
      {error ? <ErrorComponent text={error} textSize="lg" /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24,
  },
  inputGroup: {
    display: 'flex',
    gap: 2,
  },
  modeToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  useBioToggleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  }
});
