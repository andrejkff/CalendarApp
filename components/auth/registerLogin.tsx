import { StyleSheet, View, Button, Text } from 'react-native';
import EmailInputComponent from '../shared/inputs/email';
import PasswordInputComponent from '../shared/inputs/password';
import ErrorComponent from '../shared/error';
import { auth } from '../../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function RegisterLogin() {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validityState, setValidityState] = useState<{ password: boolean, email: boolean}>({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formIsValid = (): boolean => Object.values(validityState).every(value => value === true);

  const submitDisabled = (): boolean => loading || !formIsValid();

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    const actionFn = mode === 'register' ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    actionFn(auth, email, password)
    .catch(error => {
      setLoading(false);
      setError(error.message);
    });
  };

  function switchToLoginUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Already have an account?</Text>
        <Button title="Log in" onPress={() => setMode('login')} />
      </View>
    )
  };

  function switchToRegisterUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Do not have an account?</Text>
        <Button title="Register" onPress={() => setMode('register')} />
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>Email</Text>
        <EmailInputComponent
          onValueChange={setEmail}
          onValidityChange={(newValidity: boolean) => setValidityState({
            ...validityState,
            email: newValidity,
          })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Password</Text>
        <PasswordInputComponent
          onValueChange={setPassword}
          onValidityChange={(newValidity: boolean) => setValidityState({
            ...validityState,
            password: newValidity,
          })}
        />
      </View>
      <Button
        title={mode === 'register' ? 'Sign up' : 'Log in'}
        disabled={submitDisabled()}
        onPress={submit}
      />
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
  }
});
