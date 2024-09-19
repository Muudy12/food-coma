import "./Layout.scss";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import FoodComaLogo from "../../assets/logos/food-coma-logo.png";

function Layout() {
  const link = document.querySelector("link[rel~='icon'");
  link.href = FoodComaLogo;
  document.title = "Food Coma";

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
