import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthNav from "../../Account-setup/AuthNav";

const Header = () => {
  return (
    <header className="form-header">
      <h1 className="title-header">Paw Detective</h1>
      <div className="login-logo">
        <Link to="/">
          <FaHome className="fa-home" size={30} />
        </Link>
        <AuthNav />
      </div>
    </header>
  );
};

export default Header;
