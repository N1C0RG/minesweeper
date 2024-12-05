import Lose from "../../assets/lose-img.png";
import { X } from 'lucide-react';

function loseMessage({closeMessage, replay}) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-gray-800 w-[600px] h-[350px] border-4 border-gray-100">
      <div className="self-end bg-gray-100 rounded mr-2" onClick={() => closeMessage()}>
        <X />
      </div>
      <h1 className="text-gray-100 text-7xl">Game Over!</h1>
      <p className="text-gray-100 text-4xl">Better luck next time</p>
      <img src={Lose} className="h-30 w-36 hover:scale-125 hover:cursor-pointer" alt="win trophy" onClick={() => replay()}/>
    </div>
  );
} 
export default loseMessage; 