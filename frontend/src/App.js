import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Homepage from "./components/pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import { AppContext } from "./utils/store/appContext";
import { useContext } from "react";
import Dashboard from "./components/pages/Dashboard";
import Donate from "./components/pages/Donate";
import Receive from "./components/pages/Receive";

function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<Login />} />
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
          {isLoggedIn && <Route path="/donate" element={<Donate />} />}
          {isLoggedIn && <Route path="/recieve" element={<Receive />} />}
          {isLoggedIn && <Route path="/my-donations" element={null} />}
          {isLoggedIn && <Route path="/my-profile" element={null} />}
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
