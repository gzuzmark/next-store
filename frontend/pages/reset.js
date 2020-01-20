import ResetPassword from '../components/Reset';

const Reset = props => (
  <div>
    <p>Reset you password!{props.query.resetToken}</p>
    <ResetPassword resetToken={props.query.resetToken} />
  </div>
);

export default Reset;
