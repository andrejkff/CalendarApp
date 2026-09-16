import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { IGenericInputProps } from '../../types/components/inputs';

interface Props extends IGenericInputProps {};

export default function PasswordInput({
  onValueChange,
  onValidityChange,
}: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = () => {
    const value = password.trim();

    if (!value) {
      setError('Password is required');
      onValidityChange(false);
      return;
    }

    setError('');
    onValidityChange(true);
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => {
          setPassword(value);
          onValueChange(value);
        }}
        placeholder="Enter your password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.errorLabel}>{error}</Text> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    height: 64,
  },
  errorLabel: {
    paddingLeft: 4,
    color: 'red',
  }
});
