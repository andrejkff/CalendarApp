import { View, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { IGenericInputProps } from '../../../types/components/inputs';
import { styles } from './styles';

import ErrorComponent from '../error';

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
      {error ? <ErrorComponent text={error} textSize="sm" additionalStyles={styles.error}/> : <></>}
    </View>
  );
};
