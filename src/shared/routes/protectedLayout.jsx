import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/layout/header'; // Import your Header component

const Layout = ({ title, Component }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title + ' | Task Project';

    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return (
    <div>
      <Header />
      <main>
        <Component />
      </main>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
  isProtectedRoute: PropTypes.bool.isRequired, // Prop for protected route check
};

export default Layout;
