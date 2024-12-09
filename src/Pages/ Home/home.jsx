import Navbar from "../../Commponents/Navbar/navbar";
import Mine from "../../assets/game/mine-icon.png";
import { Link } from "react-router-dom";
import I1 from "../../assets/I1.png";
import I2 from "../../assets/I2.png";
import I3 from "../../assets/I3.png";
import I4 from "../../assets/I4.png";
import I5 from "../../assets/I5.png";
import I6w from "../../assets/I6w.png";
import I6l from "../../assets/I6l.png";
import I7 from "../../assets/I7.png";
import Instruction from "../../Commponents/Instruction/instruction";
import Login from "../../Commponents/Login/login";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

function Home () {

  const { getLogged } = useContext(AppContext);

  const instructions = [
    "Click on the icon to start the game.",
    "Click on a cell to reveal it.",
    "Right click on a cell to flag it.",
    "Reveal all cells without mines to win.",
    "Reveal a cell with a mine to lose.",
    "Replay by clicking the trophy or vault boy.",
    "Hard mode for screen sizes under 640px is not available."
  ];

  return (
    <div className="text-blue-400 relative min-h-screen">
      <div className={cn("", 
        {
          "pointer-events-none blur-md": !getLogged,
          "pointer-events-auto blur-none": getLogged
        }
      )}>
        <Navbar />
      </div>
      <div className="absolute inset-0 bgGrid z-[-1] opacity-50 min-h-screen"></div>
      <div className={cn("", 
        {
          "pointer-events-none blur-md": !getLogged,
          "pointer-events-auto blur-none": getLogged
        }
      )}>
        <section>
          <h1 className="font-bold text-6xl sm:text-9xl text-blue-800 text-center">Welcome to Minesweeper</h1>
          <span className="flex justify-center flex-row items-center mt-2">
            <p className="text-xl sm:text-2xl">Click the icon</p>
            <Link className="text-center" to="/game">
              <img src={Mine} className="size-7 sm:size-10 ml-1 mr-1 hover:scale-125" alt="mine-icon" />
            </Link>
            <p className="text-2xl">to start playing</p>
          </span>

        </section>

        <section className="flex flex-col items-center sm:items-start gap-10 mt-10 sm:mt-20 sm:ml-8 text-4xl">
          <h2 className="text-5xl sm:text-7xl text-blue-600">How the game works ?</h2>
          <p className="ml-4 mr-4 text-justify sm:text-left sm:ml-0 sm:mr-0">
            The objective of the game is to clear a rectangular board containing
            hiddthout detonating any
            of them, with help from clues about the number of neighboring mines in each field.
          </p>
        </section>
        <section className="flex flex-col gap-10 mt-20 ml-8 mr-8 text-4xl mb-10">
          <h3 className="text-center text-blue-600 text-5xl sm:text-7xl">Instructions</h3>
          <span className="flex flex-col gap-5 items-center">
            <Instruction images={[I1]} text={instructions[0]}/>
            <Instruction images={[I2]} text={instructions[1]}/>
            <Instruction images={[I3]} text={instructions[2]}/>
            <Instruction images={[I4]} text={instructions[3]}/>
            <Instruction images={[I5]} text={instructions[4]}/>
            <Instruction images={[I6l, I6w]} text={instructions[5]}/>
            <Instruction images={[I7]} text={instructions[6]}/>
          </span>

        </section>
      </div>
      <section className="absolute top-[10%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 blur-none">
        <Login />
      </section>
    </div>
  )
}

export default Home; 