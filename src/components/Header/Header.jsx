import "./Header.scss";
import MuPortLogo from "../../assets/logos/mu-port.png";
import { useEffect, useState } from "react";

function Header() {
  const [activeDashboard, setActiveDashboard] = useState("");

  useEffect(() => {
    const currentPath = document.location.pathname;

    switch (currentPath) {
      case "/":
        setActiveDashboard("active");
        break;
      case "dashboard":
        setActiveDashboard("active");
        break;
      default:
        break;
    }
  }, []);
  return (
    <>
      <header className="food-coma__header header">
        <nav className="header__nav nav">
          <img
            className="nav__mu-port"
            src={MuPortLogo}
            alt="Mu Portfolio Logo"
            onClick={() => window.location.href="https://main--muport.netlify.app/"}
          />
          <ul className="nav__list">
            <li className="nav__list-item">
              <a className={`${activeDashboard}`} href="/">
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
