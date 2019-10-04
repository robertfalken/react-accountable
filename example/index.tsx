import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AuthForm } from './AuthForm';
import { Inside } from './Inside';
import { Accountable, Context } from '../';

const App = () => {
  return (
    <Accountable
      formComponent={AuthForm}
      url="http://localhost:4000/authentication"
    >
      <Inside />
    </Accountable>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
