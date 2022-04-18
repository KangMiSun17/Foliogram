import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";
import Follows from "./components/follow/Follows";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { UserContext } from "./components/common/context/UserContext";

function App() {
  const { isFetchCompleted } = useContext(UserContext);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/users/:userId" element={<Portfolio />} />
        <Route path="/users/follows" element={<Follows />} />
        <Route path="/network" element={<Network />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
