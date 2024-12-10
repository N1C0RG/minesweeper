import Medal1 from "../../assets/medal-1.png";
import Medal2 from "../../assets/medal-2.png";
import Medal3 from "../../assets/medal-3.png";

function leaderBoardItem({ rank, alias, score }) {
  
  const medals = [
    '#ff9b4f', '#f09651', '#e19054', '#d18b56', '#c28559',
    '#b3805b', '#a47a5e', '#947560', '#856f63', '#766a65'
  ];

  return (
    <div 
    
    className="relative  border-2 rounded-lg shadow-lg w-3/4 h-28 justify-center items-center mx-auto grid grid-cols-3 p-7 hover:scale-105 transition-none ease-out">
      <div className="bgLeaderboardItem"></div>
      {rank === 1 && <img src={Medal1} className="justify-self-center w-10 h-16" alt="golden medal" />}
      {rank === 2 && <img src={Medal2} className="justify-self-center w-10 h-16" alt="silver medal" />}
      {rank === 3 && <img src={Medal3} className="justify-self-center w-10 h-16" alt="bronce medal" />}
      {rank > 3 && <h1 style={{backgroundColor: `${medals[rank - 1]}`}} className="rounded-full w-10 justify-self-center text-3xl sm:text-4xl">{rank}</h1>}
      <h1 className=" text-3xl font-semibold sm:text-4xl overflow-hidden">{alias}</h1>
      <h1 className="text-3xl font-semibold sm:text-4xl overflow-hidden">{score}</h1>
    </div>
  )
}

export default leaderBoardItem;