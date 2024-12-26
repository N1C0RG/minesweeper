import Navbar from "../../Commponents/Navbar/navbar";
import LeaderBoardItem from "../../Commponents/LeaderBoard/leaderBoardItem";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/appContext";

const URL = process.env.REACT_APP__BACKEND_URL; // URL del backend

function LeaderBoard() {
  const [users, setUsers] = useState([]);
  const { getLeaderboardUsers } = useContext(AppContext);

  useEffect(() => {
    showUsers();
  }, [getLeaderboardUsers]);

  function showUsers() {
    if (typeof getLeaderboardUsers() === 'object'){
      setUsers(getLeaderboardUsers()); 
    } 
    else {
      axios.get(`${URL}/user`)
        .then((response) => {
          setUsers(response.data);
          const sortedUsers = response.data.sort((a, b) => b.score - a.score);
          setUsers(sortedUsers);
          console.log('Get users successfull'); 
        }).catch((error) => {
          console.error('Get users error: ', error);
        });
    } 


  }
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 bgImage z-[-1] opacity-80 min-h-screen"></div>

      <section className="relative justify-evenly items-center border-4 bg-gray-100 z-[-1] border-gray-100 shadow-sm rounded-lg w-3/4 p-7 mx-auto my-auto h-full">
        <div className=" bgLeaderboard "></div>
        <h1 className="text-6xl sm:text-7xl xl:text-9xl text-gray-900 font-bold opacity-100">Leader Board</h1>
      </section>

      <section className="grid w-3/4 items-center mx-auto mt-10 grid-cols-3 grid-rows-1 text-gray-100 font-bold">
        <h1 className="text-3xl sm:text-5xl">Rank</h1>
        <h1 className="text-3xl sm:text-5xl">Alias</h1>
        <h1 className="text-3xl sm:text-5xl">Score</h1>
      </section>

      <section className="flex flex-col gap-4 mt-6">
        {users.map((user, index) => (
          <LeaderBoardItem 
            key={index} 
            rank={index + 1} 
            alias={user.username} 
            score={user.score}  
          />
        ))}
      </section>

    </div>
  );
}

export default LeaderBoard;