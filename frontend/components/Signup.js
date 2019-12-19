import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup(props) {
  const initialState = { email: '', name: '', password: '' };
  const [state, setState] = useState(initialState);

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: { ...state },
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
        const res = await signup();
        console.log(res);
        setState(initialState);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an Account</h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default Signup;
