import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/ Home/home";
import AboutUs from "./Pages/AboutUs/aboutUs";
import Game from "./Pages/Game/game";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/about" element={ <AboutUs /> }/>
        <Route path="/game" element={ <Game /> }/>
      </Routes>

    </BrowserRouter>
  );
}

export default Routing;