import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGIN_MUTATION = gql`
  mutation SIGIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function Signin(props) {
  const initialState = { email: '', password: '' };
  const [state, setState] = useState(initialState);

  const [signin, { loading, error }] = useMutation(SIGIN_MUTATION, {
    variables: { ...state },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const saveToState = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        console.log(state);
        const res = await signin();
        console.log(res);
        setState(initialState);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign in into your Account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={saveToState}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={saveToState}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}

export default Signin;
