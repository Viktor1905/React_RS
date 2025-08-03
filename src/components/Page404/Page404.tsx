import { NavLink } from 'react-router';

export function Page404() {
  return (
    <>
      <h1>Page 404</h1>
      <p>
        Looks like you’ve followed a broken link or entered a URL that doesn’t
        exist on this site.{' '}
      </p>
      <NavLink to={'/'}>
        <button> Go back</button>
      </NavLink>
    </>
  );
}
