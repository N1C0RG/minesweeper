import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/ Home/home";
import AboutUs from "./Pages/AboutUs/aboutUs";
import Game from "./Pages/Game/game";
import LeaderBoard from "./Pages/LeaderBoard/leaderBoard";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/about" element={ <AboutUs /> }/>
        <Route path="/game" element={ <Game /> }/>
        <Route path="/leader-board" element={ <LeaderBoard /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;