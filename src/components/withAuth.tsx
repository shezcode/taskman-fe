import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext'; // Assuming you have this context for auth
import { NextPage } from 'next';

function withAuth<P>(WrappedComponent: NextPage<P>) {
  const AuthenticatedComponent = (props: P) => {
    const { user } = useContext(AuthContext); // Get the user state from context
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [user, router]);

    // While waiting for user state, render a loading indicator
    if (!user) {
      return <div>Loading...</div>; // Customize with your loading spinner
    }

    // Render the wrapped component once authenticated
    return (<WrappedComponent {...props} />);
  };

  return AuthenticatedComponent;
}

export default withAuth;
