import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./style.css"
export default function Main() {
  return (
    <div className="root-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", maxWidth:"auto" }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
