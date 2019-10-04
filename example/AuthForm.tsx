import 'react-app-polyfill/ie11';
import * as React from 'react';

export const AuthForm = ({ form, email, password, isLoading }) => {
  return (
    <form {...form}>
      <input {...email} placeholder="email" />
      <input {...password} placeholder="password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};
