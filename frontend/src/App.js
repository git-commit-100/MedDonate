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
import Admin from "./components/Admin/Admin";
import AdminDonations from "./components/Admin/Donations/AdminDonations";
import AdminReceive from "./components/Admin/Receive/AdminReceive";
import MyDonations from "./components/pages/My Donations";
import Checkout from "./components/pages/Checkout";
import Profile from "./components/pages/Profile";
import AdminReviewMeds from "./components/Admin/Donations/AdminReviewMeds";
import AdminUsers from "./components/Admin/Users/AdminUsers";

function App() {
  const { isLoggedIn, role } = useContext(AppContext);
  const user = role === "user";
  return (
    <>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {user && <Route path="/home" element={<Homepage />} />}
            {!isLoggedIn && <Route path="/login" element={<Login />} />}
            {isLoggedIn && user && (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            {isLoggedIn && user && (
              <Route path="/donate" element={<Donate />} />
            )}
            {isLoggedIn && user && (
              <Route path="/receive" element={<Receive />} />
            )}
            {isLoggedIn && user && (
              <Route path="/checkout/:id" element={<Checkout />} />
            )}
            {isLoggedIn && user && (
              <Route path="/my-donations" element={<MyDonations />} />
            )}
            {isLoggedIn && user && (
              <Route path="/my-profile" element={<Profile />} />
            )}
            {isLoggedIn && !user && (
              <Route path="/admin/users" element={<AdminUsers />} />
            )}
            {isLoggedIn && !user && <Route path="/admin" element={<Admin />} />}
            {isLoggedIn && !user && (
              <Route path="/admin/receive" element={<AdminReceive />} />
            )}
            {isLoggedIn && !user && (
              <Route
                path="/admin/review/:medId"
                element={<AdminReviewMeds />}
              />
            )}
            {isLoggedIn && !user && (
              <Route path="/admin/donations" element={<AdminDonations />} />
            )}

            <Route path="/" element={<Navigate replace to="/home" />} />

            {isLoggedIn && user && (
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
            )}
            {isLoggedIn && !user && (
              <Route path="*" element={<Navigate replace to="/admin" />} />
            )}

            {!isLoggedIn && (
              <Route path="*" element={<Navigate replace to="/home" />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
