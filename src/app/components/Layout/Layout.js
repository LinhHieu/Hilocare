import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation sidebar={props.sidebar} openclick={props.openclick} hideclick={props.hideclick}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;