import * as React from 'react';

const Context = React.createContext({});

const fetchOptions: RequestInit = {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

interface SignInForm {
  email: Object;
  password: Object;
  form: Object;
  isLoading: Boolean;
}

type Props = {
  url: string;
  children: React.ReactNode;
  formComponent: React.ComponentType<SignInForm>;
};

const PENDING = 'pending';
const AUTHENTICATING = 'authenticating';
const AUTHENTICATED = 'authenticated';
const AUTHENTICATION_FAILED = 'authentication-failed';
const NOT_AUTHENTICATED = 'not-authenticated';

export const Accountable = ({ children, url, formComponent }: Props) => {
  const [authState, setAuthState] = React.useState(PENDING);
  const [emailState, setEmail] = React.useState('');
  const [passwordState, setPassword] = React.useState('');
  const FormComponent = formComponent;

  React.useEffect(() => {
    fetch(`${url}/refresh`, {
      ...fetchOptions,
    }).then(response => {
      if (response.status === 200) {
        setAuthState(AUTHENTICATED);
      } else {
        setAuthState(NOT_AUTHENTICATED);
      }
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const payload = {
      email: emailState,
      password: passwordState,
    };

    setAuthState(AUTHENTICATING);
    fetch(`${url}/authenticate`, {
      ...fetchOptions,
      body: JSON.stringify(payload),
    }).then(response => {
      if (response.status === 200) {
        setAuthState(AUTHENTICATED);
      } else {
        setAuthState(AUTHENTICATION_FAILED);
      }
    });
  };

  const signOut = () => {
    fetch(`${url}/logout`, fetchOptions).then(() => {
      setAuthState(NOT_AUTHENTICATED);
    });
  };

  const email = {
    name: 'email',
    type: 'text',
    value: emailState,
    onChange: (event: React.SyntheticEvent) => {
      const target = event.currentTarget as HTMLInputElement;
      setEmail(target.value);
    },
  };

  const password = {
    name: 'password',
    type: 'password',
    value: passwordState,
    onChange: (event: React.SyntheticEvent) => {
      const target = event.currentTarget as HTMLInputElement;
      setPassword(target.value);
    },
  };

  if (authState === PENDING) return null;

  return (
    <Context.Provider value={{ signOut }}>
      {authState === AUTHENTICATED ? (
        children
      ) : (
        <FormComponent
          form={{ onSubmit: handleSubmit }}
          email={email}
          password={password}
          isLoading={authState === AUTHENTICATING}
        />
      )}
    </Context.Provider>
  );
};

export { Context };
