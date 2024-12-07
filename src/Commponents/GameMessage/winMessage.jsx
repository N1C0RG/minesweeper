import Trophy from "../../assets/trophy.png";
import { X } from 'lucide-react';

function winMessage({closeMessage,replay}) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-sky-600 w-80 sm:w-[600px] h-[350px] border-4 border-gray-100">
      <div className="self-end" onClick={() => closeMessage()}>
        <X />
      </div>
      <h1 className="text-gray-100 text-4xl sm:text-7xl">Congratulations!</h1>
      <p className="text-gray-100 text-xl sm:text-4xl">You have won the game!</p>
      <img src={Trophy} className="h-30 w-20 hover:scale-125 hover:cursor-pointer" alt="win trophy" onClick={() => replay()}/>
    </div>
  );
} 
export default winMessage; 