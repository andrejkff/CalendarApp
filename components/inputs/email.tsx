import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { IGenericInputProps } from '../../types/components/inputs';

interface Props extends IGenericInputProps {};

export default function EmailInput({
  onValueChange,
  onValidityChange,
}: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    const value = email.trim();

    if (!value) {
      setError('Email is required');
      onValidityChange(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address');
      onValidityChange(false);
      return;
    }

    setError('');
    onValidityChange(true);
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => {
          setEmail(value);
          onValueChange(value);
        }}
        placeholder="Enter your email"
        keyboardType="email-address"
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
    paddingLeft: 14,
    color: 'red',
  }
});
