import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ estaLogueado, onLogout }) {
  return (
    <div className="app-layout">
      <Header
        estaLogueado={estaLogueado}
        onLogout={onLogout}
      />

      <main className="layout-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;