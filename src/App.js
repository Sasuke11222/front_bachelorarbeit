import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

import EventBus from "./common/EventBus";
import Hauptseite from "./pages/Hauptseite";
import Komponentenuebersicht from "./pages/Komponentenuebersicht";
import Systemuebersicht from "./pages/Systemuebersicht";
import Mitarbeiter from "./pages/Mitarbeiter";
import Systemhersteller from "./pages/Systemhersteller";
import AddSystemhersteller from "./components/forms/AddSystemhersteller";
import Test from "./pages/Test";
import Kraftwerksdaten from "./pages/Kraftwerksdaten";
import AddMitarbeiter from "./components/forms/AddMitarbeiter";
import AddKomponente from "./components/forms/AddKomponente";
import AddKomponente2 from "./components/forms/AddKomponente2";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;

    console.log(currentUser)

    const foto = {
      marginRight: "1%",
      borderRadius: "5px"
    }

    const navbar = {
      background: "#0067ac",
      color: "#FFF",
    }

    return (
      <div>
        <nav className="navbar navbar-expand" style={navbar}>
          <img height="50px" src="./images/LEAG_Logo.jpg" style={foto}/>
          Grundschutz IT-Sicherheit
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link">
                  {currentUser.username}
                </a>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrieren
                </Link>
              </li>
            </div>
          )}
        </nav>


        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Home />} />
            <Route path="/hauptseite" element={<Hauptseite />} />
            <Route path="/test" element={<Test />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={"/komponentenuebersicht"} element={ <Komponentenuebersicht />} />
            <Route path="/systemuebersicht" element={<Systemuebersicht/>} />
            <Route path={"/mitarbeiter"} element={ <Mitarbeiter />} />
            <Route path={"/addKomponente"} element={ <AddKomponente />} />
            <Route path={"/addK"} element={ <AddKomponente2 />} />
            <Route path={"/systemhersteller"} element={ <Systemhersteller />} />
            <Route path={"/addSystemhersteller"} element={ <AddSystemhersteller />} />
            <Route path={"/addMitarbeiter"} element={ <AddMitarbeiter />} />
            <Route path={"/kraftwerksdaten"} element={ <Kraftwerksdaten />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
