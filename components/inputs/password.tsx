import { View, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { IGenericInputProps } from '../../types/components/inputs';
import { styles } from './styles';

import ErrorComponent from '../shared/error';

import { PASSWORD_MIN_LENGTH } from '../../constants/auth';

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

    if (value.length < PASSWORD_MIN_LENGTH) {
      setError(`Password has to be at least ${PASSWORD_MIN_LENGTH} characters long`);
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
      {error ? <ErrorComponent text={error} textSize="sm" additionalStyles={{ paddingLeft: 4 }}/> : <></>}
    </View>
  );
};
