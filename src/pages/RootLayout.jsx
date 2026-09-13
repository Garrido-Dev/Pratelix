import { Link, Outlet } from "react-router-dom";
import logoImg from "../assets/logo.png"; // Ajuste o caminho da sua imagem

export default function RootLayout() {
  return (
    <div className="app-container">

      <header className="header-container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src={logoImg} alt="Logo Pratelix" className="logo-img" />
          </Link>
          <nav className="nav-container">
            <Link to="/" className="nav-button">Início</Link>
            <Link to="/items" className="nav-button">Itens</Link>
          </nav>
        </div>
      </header>


      <div className="main-content">
        <Outlet />
      </div>

      <footer className="footer-container">
        <p>Feito com React e React Router</p>
      </footer>
    </div>
  );
}