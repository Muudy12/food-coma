import "./Header.scss";
import MuPortLogo from "../../assets/logos/mu-port.png";

function Header() {
  return (
    <>
      <header className="food-coma__header header">
        <nav className="header__nav nav">
          <img
            className="nav__mu-port"
            src={MuPortLogo}
            alt="Mu Portfolio Logo"
            onClick={() => navigate("/")}
          />
          <ul className="nav__list">
            <li className="nav__list-item">
              <a className="" href="/food-coma">
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
