import * as Keychain from 'react-native-keychain';

const SERVICE = 'com.calendarapp.biometric-login';

export async function isBiometricAvailable(): Promise<boolean> {
  const biometryType = await Keychain.getSupportedBiometryType();
  return biometryType !== null;
}

export async function saveBiometricCredentials(
  email: string,
  password: string,
): Promise<void> {
  await Keychain.setGenericPassword(email, password, {
    service: SERVICE,

    accessControl:
      Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,

    accessible:
      Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,

    authenticationPrompt: {
      title: 'Enable biometric login',
      subtitle: 'Authenticate to enable biometric login',
      description: 'Your credentials will be protected on this device.',
      cancel: 'Cancel',
    },
  });
}

export async function getBiometricCredentials(): Promise<{
  email: string;
  password: string;
} | null> {
  const credentials = await Keychain.getGenericPassword({
    service: SERVICE,

    authenticationPrompt: {
      title: 'Login',
      subtitle: 'Authenticate to continue',
      description: 'Use your biometric authentication.',
      cancel: 'Cancel',
    },
  });

  if (!credentials) {
    return null;
  }

  return {
    email: credentials.username,
    password: credentials.password,
  };
}

export async function removeBiometricCredentials(): Promise<void> {
  await Keychain.resetGenericPassword({
    service: SERVICE,
  });
}

export async function hasActiveBiometricCredentials(): Promise<boolean> {
  const result = await Keychain.hasGenericPassword({
    service: SERVICE,
  });

  return result;
}
