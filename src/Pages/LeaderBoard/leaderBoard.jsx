import Navbar from "../../Commponents/Navbar/navbar";
import JunimoStarfruit from "../../assets/junimo-starfruit.png";
import LeaderBoardItem from "../../Commponents/LeaderBoard/leaderBoardItem";
import Medal1 from "../../assets/medal-1.png";
import Medal2 from "../../assets/medal-2.png";
import Medal3 from "../../assets/medal-3.png";

function leaderBoard() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 bgImage z-[-1] opacity-80 min-h-screen"></div>
      <section className="flex flex-row justify-evenly items-center border-2 border-gray-100 bg-blue-800 shadow-sm rounded-lg w-3/4 p-4 mx-auto my-auto h-full">
        <img src={JunimoStarfruit} className="w-12 h-24 sm:w-20 sm:h-40 hover:scale-125" alt="junimo-starfruit" />
        <h1 className="text-5xl sm:text-7xl xl:text-9xl text-gray-100">Leader Board</h1>
        <img src={JunimoStarfruit} className="w-12 h-24 sm:w-20 sm:h-40 hover:scale-125" alt="junimo-starfruit" />
      </section>

      <span className="grid w-3/4 items-center mx-auto mt-10 grid-cols-3 grid-rows-1">
        <h1 className="text-3xl sm:text-5xl">Rank</h1>
        <h1 className="text-3xl sm:text-5xl">Alias</h1>
        <h1 className="text-3xl sm:text-5xl">Score</h1>
      </span>
      <section className="flex flex-col gap-4 mt-6">
        <LeaderBoardItem />
        <LeaderBoardItem />
        <LeaderBoardItem />
      </section>

    </div>
  );
}

export default leaderBoard;