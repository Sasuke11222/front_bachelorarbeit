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
import UpdateKraftwerksdaten from "./components/forms/UpdateKraftwerksdaten";
import Komponentenuebersicht from "./pages/Komponentenuebersicht";
import Systemuebersicht from "./pages/Systemuebersicht";
import Mitarbeiter from "./pages/Mitarbeiter";
import Systemhersteller from "./pages/Systemhersteller";
import AddSystemhersteller from "./components/forms/AddSystemhersteller";
import Kraftwerksdaten from "./pages/Kraftwerksdaten";
import AddMitarbeiter from "./components/forms/AddMitarbeiter";
import AddKraftwerk from "./components/forms/AddKraftwerk";
import AddUSB from "./components/forms/AddUSB";
import USBListe from "./components/listen/USBListe";
import AddRJ45 from "./components/forms/AddRJ45";
import RJ45Liste from "./components/listen/RJ45Liste";
import AddFirewall from "./components/forms/AddFirewall";
import FirewallListe from "./components/listen/FirewallListe";
import AddVirenschutzhersteller from "./components/forms/AddVirenschutzhersteller";
import VirenschutzherstellerListe from "./components/listen/VirenschutzherstellerListe";
import KraftwerkListe from "./components/listen/KraftwerkListe";
import VirenschutzstatusListe from "./components/listen/VirenschutzstatusListe";
import AddVirenschutz from "./components/forms/AddVirenschutz";
import AddSystemtyp from "./components/forms/AddSystemtyp";
import SystemtypListe from "./components/listen/SystemtypListe";
import SystemeinheitListe from "./components/listen/SystemeinheitListe";
import AddSystemeinheit from "./components/forms/AddSystemeinheit";
import AddOffice from "./components/forms/AddOffice";
import AddZone from "./components/forms/AddZone";
import OfficeListe from "./components/listen/OfficeListe";
import AddKontotyp from "./components/forms/AddKontotyp";
import AddKrit from "./components/forms/AddKrit";
import AddBetriebssystem from "./components/forms/AddBetriebssystem";
import AddKontoart from "./components/forms/AddKontoart";
import KritListe from "./components/listen/KritListe";
import ZoneListe from "./components/listen/ZoneListe";
import BetriebssystemListe from "./components/listen/BetriebssystemListe";
import KontotypListe from "./components/listen/KontotypListe";
import KontoartListe from "./components/listen/KontoartListe";
import AddSystem from "./components/forms/AddSystem";
import AddElement from "./components/forms/AddElement";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
        currentStandort:"",
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

    const navitem = {
        color: "#FFF"
    }

    const foto = {
      marginRight: "1%",
      borderRadius: "5px"
    }

    const navbar = {
      background: "#0067ac",
      color: "#FFF",
    }
    /*
    <Link to={"/user"} className="nav-link">
                  User
                </Link>
     */

    return (
      <div>
        <nav className="navbar navbar-expand" style={navbar}>
          <img height="50px" src="./images/LEAG_Logo.jpg" style={foto}/>
          Grundschutz IT-Sicherheit
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
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
              <li style={navitem} >
                <Link to={"/login"} className="nav-link">
                  Login
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
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={"/komponentenuebersicht"} element={ <Komponentenuebersicht />} />
              <Route path={"/addKomponente"} element={ <AddElement />} />
            <Route path="/systemuebersicht" element={<Systemuebersicht/>} />
              <Route path="/addSystem" element={<AddSystem/>} />
            <Route path={"/mitarbeiter"} element={ <Mitarbeiter />} />
            <Route path={"/systemhersteller"} element={ <Systemhersteller />} />
              <Route path={"/addKraftwerk"} element={ <AddKraftwerk/>}/>
              <Route path={"/Kraftwerk"} element={ <KraftwerkListe/>}/>
            <Route path={"/addSystemhersteller"} element={ <AddSystemhersteller />} />
            <Route path={"/addMitarbeiter"} element={ <AddMitarbeiter />} />
              <Route path={"/addRJ45"} element={ <AddRJ45 />} />
              <Route path={"/RJ45"} element={ <RJ45Liste/>} />
              <Route path={"/addFirewall"} element={ <AddFirewall />} />
              <Route path={"/Firewall"} element={ <FirewallListe/>} />
              <Route path={"/addVirenschutzhersteller"} element={ <AddVirenschutzhersteller />} />
              <Route path={"/Virenschutzhersteller"} element={ <VirenschutzherstellerListe/>} />
              <Route path={"/addVirenschutz"} element={ <AddVirenschutz />} />
              <Route path={"/Virenschutz"} element={ <VirenschutzstatusListe/>} />
              <Route path={"/addSystemtyp"} element={ <AddSystemtyp />} />
              <Route path={"/Systemtyp"} element={ <SystemtypListe/>} />
              <Route path={"/addSystemeinheit"} element={ <AddSystemeinheit />} />
              <Route path={"/Systemeinheit"} element={ <SystemeinheitListe/>} />
              <Route path={"/addUSB"} element={ <AddUSB />} />
              <Route path={"/USB"} element={ <USBListe/>} />
              <Route path={"/addOffice"} element={ <AddOffice />} />
              <Route path={"/Office"} element={ <OfficeListe/>} />
              <Route path={"/addBetriebssystem"} element={ <AddBetriebssystem />} />
              <Route path={"/Betriebssystem"} element={ <BetriebssystemListe/>} />
              <Route path={"/addZone"} element={ <AddZone />} />
              <Route path={"/Zone"} element={ <ZoneListe/>} />
              <Route path={"/addKrit"} element={ <AddKrit />} />
              <Route path={"/Krit"} element={ <KritListe/>} />
              <Route path={"/addKontotyp"} element={ <AddKontotyp />} />
              <Route path={"/Kontotyp"} element={ <KontotypListe/>} />
              <Route path={"/addKontoart"} element={ <AddKontoart />} />
              <Route path={"/Kontoart"} element={ <KontoartListe/>} />
            <Route path={"/kraftwerksdaten"} element={ <Kraftwerksdaten />} />
            <Route path={"/updatekraftwerksdaten"} element={ <UpdateKraftwerksdaten />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
