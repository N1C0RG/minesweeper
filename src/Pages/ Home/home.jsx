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

function Home () {
  return (
    <body className="text-blue-400 relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 bgGrid z-[-1] opacity-50"></div>
      <div>
        <section>
          <h1 className="font-bold text-9xl text-blue-800	text-center">Welcome to Minesweeper</h1>
          <span className="flex justify-center flex-row items-center">
            <p className="text-2xl">Click the icon</p>
            <Link className="text-center" to="/game">
              <img src={Mine} className=" size-10 ml-1 mr-1 hover:scale-125" alt="mine-icon" />
            </Link>
            <p className="text-2xl">to start playing</p>
          </span>

        </section>

        <section className="flex flex-col items-start gap-10 mt-20 ml-8 text-4xl">
          <h2 className="text-7xl text-blue-600">How the game works ?</h2>
          <p className="text-left">
            The objective of the game is to clear a rectangular board containing
            hiddthout detonating any
            of them, with help from clues about the number of neighboring mines in each field.
          </p>
        </section>
        <section className="flex flex-col gap-10 mt-20 ml-8 mr-8 text-4xl mb-10">
          <h3 className="text-center text-blue-600 text-7xl">Instructions</h3>
          <span className="flex flex-col gap-5 items-center">
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I1} alt="click icon instruction" />
              <p className="text-slate-950">Click on the icon to start the game.</p>
            </div>
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I2} alt="click icon instruction" />
              <p className="text-slate-950">Click on a cell to reveal it.</p>
            </div>
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I3} alt="click icon instruction" />
              <p className="text-slate-950">Right click on a cell to flag it.</p>
            </div>
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I4} alt="click icon instruction" />
              <p className="text-slate-950">Reveal all cells without mines to win.</p>
            </div>
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I5} alt="click icon instruction" />
              <p className="text-slate-950">Reveal a cell with a mine to lose.</p>
            </div>
            <div className="container flex flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
              <img className="hover:scale-110 size-1/3 rounded" src={I6w} alt="click icon instruction" />
              <img className="hover:scale-110 size-1/3 rounded" src={I6l} alt="click icon instruction" />
              <p className="text-slate-950">Replay by clicking the trophy or vault boy.</p>
            </div>
          </span>

        </section>

      </div>
    </body>
  )
}

export default Home; 