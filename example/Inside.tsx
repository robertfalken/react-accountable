import * as React from 'react';
import { Context } from '../';

export const Inside = () => {
  const { signOut, userId } = React.useContext(Context);

  return (
    <div>
      <h1>Authenticated! ({userId})</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};
