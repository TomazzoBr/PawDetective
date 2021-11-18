import React from "react";
import AuthenticationButton from "./Auth-button";

const AuthNav = () => (
  <div className="navbar-nav ml-auto"> {/*Could use <nav> tag instead of a div */}
    <AuthenticationButton />
  </div>
);

export default AuthNav;
