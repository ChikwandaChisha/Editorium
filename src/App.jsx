import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <h1>Test: Routes Below</h1>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/test" element={<h2>Test Route</h2>} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </>
  );
}
