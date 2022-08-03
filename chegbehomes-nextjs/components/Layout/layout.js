import { Fragment } from "react/cjs/react.production.min";
import MainFooter from "./footer";

import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </Fragment>
  );
}

export default Layout;
