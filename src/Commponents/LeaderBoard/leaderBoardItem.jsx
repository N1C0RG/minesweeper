import Medal1 from "../../assets/medal-1.png";
import Medal2 from "../../assets/medal-2.png";
import Medal3 from "../../assets/medal-3.png";

function leaderBoardItem({ rank, alias, score }) {
  return (
    <div className="bg-sky-500 rounded-lg shadow-lg w-3/4 justify-center items-center mx-auto grid grid-cols-3 p-7 hover:scale-105 transition-none ease-out">
      {rank === 1 && <img src={Medal1} className="justify-self-center w-10 h-16" alt="golden medal" />}
      {rank === 2 && <img src={Medal2} className="justify-self-center w-10 h-16" alt="silver medal" />}
      {rank === 3 && <img src={Medal3} className="justify-self-center w-10 h-16" alt="bronce medal" />}
      {rank > 3 && <h1 className="text-xl sm:text-3xl">{rank}</h1>}
      <h1 className="text-xl sm:text-3xl">{alias}</h1>
      <h1 className="text-xl sm:text-3xl">{score}</h1>
    </div>
  )
}

export default leaderBoardItem;