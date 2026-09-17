import { View, TextInput, Text } from 'react-native';
import { useState, useEffect } from 'react';

import { IGenericInputProps } from '../../../types/components/inputs';
import { styles } from './_styles';

import ErrorComponent from '../error';

interface Props extends IGenericInputProps {};

export default function EmailInput({
  onValueChange,
  onValidityChange,
  label,
}: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function validateEmail() {
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
      {label ? <Text>{label}</Text> : <></>}
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => {
          setEmail(value);
          onValueChange(value);
        }}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <ErrorComponent text={error} textSize="sm" additionalStyles={styles.error}/> : <></>}
    </View>
  );
};
