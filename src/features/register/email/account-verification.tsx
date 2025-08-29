export function AccountVerification({ token }) {
  return (
    <div>
      <h1 style={{ color: 'var(--color-accent)' }}>Verify Your Wagerize Account</h1>
      <p>
        <strong>Hi there!</strong> <br />
        This email was used to register an account at{' '}
        <a href='https://wagerize.onrender.com'>Wagerize.</a>
        <br />
        <br />
        If it wasn't you, you can ignore this message. Unverified accounts are deleted after 30
        days.
        <br />
        Otherwise, please click on{' '}
        <a href={`https://wagerize.onrender.com/api/public/users/verify?token=${token}`}>
          this link.
        </a>
        <br />
        <br />
      </p>
    </div>
  );
}
