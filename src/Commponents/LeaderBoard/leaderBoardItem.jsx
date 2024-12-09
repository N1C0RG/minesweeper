import Medal1 from "../../assets/medal-1.png";
import Medal2 from "../../assets/medal-2.png";
import Medal3 from "../../assets/medal-3.png";

function leaderBoardItem({ rank, alias, score }) {
  const colors = [
    '#00b3ff', '#04b6ff', '#08b9ff', '#0cbcff', '#10bfff',
    '#14c2ff', '#18c5ff', '#1cc8ff', '#20cbff', '#24ceff',
    '#28d1ff', '#2cd3ff', '#30d6ff', '#34d9ff', '#38dcff',
    '#3cdfff', '#40e2ff', '#44e5ff', '#48e8ff', '#4cebff',
    '#50eeff', '#54f1ff'
  ];

  return (
    <div style={{backgroundColor: `${colors[rank - 1]}`}}className="rounded-lg shadow-lg w-3/4 justify-center items-center mx-auto grid grid-cols-3 p-7 hover:scale-105 transition-none ease-out">
      {rank === 1 && <img src={Medal1} className="justify-self-center w-10 h-16" alt="golden medal" />}
      {rank === 2 && <img src={Medal2} className="justify-self-center w-10 h-16" alt="silver medal" />}
      {rank === 3 && <img src={Medal3} className="justify-self-center w-10 h-16" alt="bronce medal" />}
      {rank > 3 && <h1 className="text-3xl sm:text-4xl">{rank}</h1>}
      <h1 className="text-3xl sm:text-4xl overflow-hidden">{alias}</h1>
      <h1 className="text-3xl sm:text-4xl overflow-hidden">{score}</h1>
    </div>
  )
}

export default leaderBoardItem;