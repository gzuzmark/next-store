import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

function RequestReset(props) {
  const initialState = { email: '' };
  const [state, setState] = useState(initialState);

  const [reset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: { ...state },
    }
  );

  const saveToState = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        const res = await reset();
        setState(initialState);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
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

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
