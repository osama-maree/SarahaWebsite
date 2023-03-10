import "./App.css";
import { Home } from "./component/Home/Home.jsx";
import { Login } from "./component/Login/Login.jsx";
import { Navbar } from "./component/Navbar/Navbar.jsx";
import { Register } from "./register/Register.jsx";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Lodder } from "./component/Lodder/Lodder.jsx";
import { Users } from "./component/users/Users.jsx";
import { UserProfile } from "./component/UserProfile/UserProfile.jsx";
import cookies from "react-cookies";
import { Proifle } from "./component/myprofile/Proifle.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(cookies.load("token"));
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    const res = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );
    setLoading(false);
    setUsers(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {loading ? (
        <Lodder />
      ) : (
        <Routes>
          {user && (
            <>
              <Route
                path="/message"
                element={<Proifle user={user} users={users} />}
              />
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/user/:id" element={<UserProfile users={users} />} />
              <Route path="/home" element={<Home />} />
            </>
          )}
          <>
            <Route path="/login" element={<Login logUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </>

          <Route
            path="*"
            element={<h4 className="text-center text-danger">Page NotFound</h4>}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
