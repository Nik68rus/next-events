import React from 'react';
import MainHeader from './MainHeader';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

export default Layout;
