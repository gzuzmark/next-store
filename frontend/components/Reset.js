import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

function ResetPassword(props) {
  const initialState = { password: '', confirmPassword: '' };
  const [state, setState] = useState(initialState);

  const [reset, { loading, error, called }] = useMutation(RESET_MUTATION, {
    variables: {
      resetToken: props.resetToken,
      password: state.password,
      confirmPassword: state.confirmPassword,
    },
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
        const res = await reset();
        setState(initialState);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password</h2>
        <Error error={error} />

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

        <label htmlFor="confirmPassword">
          Confirm your Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={state.confirmPassword}
            onChange={saveToState}
          />
        </label>

        <button type="submit">Reset your Password!</button>
      </fieldset>
    </Form>
  );
}

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
};
export default ResetPassword;
