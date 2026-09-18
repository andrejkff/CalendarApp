import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import RegisterLoginComponent from '../components/screens/auth/RegisterLogin';
import EmailInputComponent from '../components/shared/inputs/email';
import PasswordInputComponent from '../components/shared/inputs/password';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../firebase', () => ({
  auth: {},
}));

jest.mock('../components/screens/auth/_service', () => ({
  isBiometricAvailable: jest.fn().mockResolvedValue(false),
  saveBiometricCredentials: jest.fn().mockResolvedValue(undefined),
  getBiometricCredentials: jest.fn().mockResolvedValue(null),
}));

const mockCreateUser =
  createUserWithEmailAndPassword as jest.Mock;

const mockSignIn =
  signInWithEmailAndPassword as jest.Mock;

describe('RegisterLogin component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders in "Sign up" mode by default, with correct button wording', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <RegisterLoginComponent />
      );
    });

    const switchToLoginButton = renderer!.root.findByProps({
      testID: 'switch-to-login-button',
    });
    expect(switchToLoginButton).toBeTruthy();
    const submitButton = renderer!.root.findByProps({
      testID: 'submit-auth-button'
    });
    expect(submitButton.props.title).toBe('Sign up');
  });

  it('switches to "Log in" mode on toggle click, with correct button wording', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <RegisterLoginComponent />
      );
    });

    const switchToLoginButton = renderer!.root.findByProps({
      testID: 'switch-to-login-button',
    });
    await ReactTestRenderer.act(() => {
      switchToLoginButton.props.onPress();
    });
    const submitButton = renderer!.root.findByProps({
      testID: 'submit-auth-button'
    });
    expect(submitButton.props.title).toBe('Log in');
  });

  it('renders the submit button as disabled initially', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<RegisterLoginComponent />);
    });

    const submitButton = renderer!.root.findByProps({
      testID: 'submit-auth-button',
    });

    expect(submitButton.props.disabled).toBe(true);
  });

  it('calls createUserWithEmailAndPassword when registering', async () => {
    mockCreateUser.mockResolvedValue({
      user: { uid: 'test-user' },
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<RegisterLoginComponent />);
    });

    const emailInput = renderer!.root.findByType(EmailInputComponent);
    const passwordInput = renderer!.root.findByType(PasswordInputComponent);

    await ReactTestRenderer.act(() => {
      emailInput.props.onValueChange('test@example.com');
      emailInput.props.onValidityChange(true);

      passwordInput.props.onValueChange('password123');
      passwordInput.props.onValidityChange(true);
    });

    const submitButton = renderer!.root.findByProps({
      testID: 'submit-auth-button',
    });

    expect(submitButton.props.disabled).toBe(false);

    await ReactTestRenderer.act(() => {
      submitButton.props.onPress();
    });

    expect(mockCreateUser).toHaveBeenCalledWith(
      expect.anything(), // auth
      'test@example.com',
      'password123',
    );
  });

  it('calls signInWithEmailAndPassword when logging in', async () => {
    mockSignIn.mockResolvedValue({
      user: { uid: 'test-user' },
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<RegisterLoginComponent />);
    });

    const switchToLoginButton = renderer!.root.findByProps({
      testID: 'switch-to-login-button',
    });
    await ReactTestRenderer.act(() => {
      switchToLoginButton.props.onPress();
    });

    const emailInput = renderer!.root.findByType(EmailInputComponent);
    const passwordInput = renderer!.root.findByType(PasswordInputComponent);

    await ReactTestRenderer.act(() => {
      emailInput.props.onValueChange('test@example.com');
      emailInput.props.onValidityChange(true);

      passwordInput.props.onValueChange('password123');
      passwordInput.props.onValidityChange(true);
    });

    const submitButton = renderer!.root.findByProps({
      testID: 'submit-auth-button',
    });

    expect(submitButton.props.disabled).toBe(false);

    await ReactTestRenderer.act(() => {
      submitButton.props.onPress();
    });

    expect(mockSignIn).toHaveBeenCalledWith(
      expect.anything(), // auth
      'test@example.com',
      'password123',
    );
  });
});
