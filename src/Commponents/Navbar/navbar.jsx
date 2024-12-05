import { House, Info, MenuIcon } from "lucide-react";
import NavbarItem from "../NavbarItem/navbarItem";
import { useState } from "react";
import cn from "classnames";
import Mine from "../../assets/game/mine-icon.png";
import { Link } from "react-router-dom";

function Navbar() { 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="text-gray-900 flex justify-start gap-10 h-32 bg-blue-500 mb-10">
        <span className="flex items-center ml-10">
          <Link to="/">
            <h1 className="text-6xl hover:cursor-pointer">Minesweeper</h1>
          </Link>
          <Link to="/game">
            <img className=" hover:scale-125 h-16 w-16 hover:cursor-pointer" src={Mine} alt="mine-icon" />
          </Link>
        </span>

        <section className="flex items-center">
          <div
           className="bg-slate-50 rounded p-1 shadow-md 
           hover:cursor-pointer hover:shadow-2xl w-12" 
           onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon size={40} /> 
          </div>
          <div className={cn(
            "absolute flex flex-col top-[93px] bg-slate-50 rounded opacity-0 transition-all ease-in-out duration-300",
            {
              "invisible opacity-0": !menuOpen, 
              "visible opacity-100": menuOpen, 
            })}> 
            <NavbarItem icon={<House size={40} />} child="Home" route="/" />
            <NavbarItem icon={<Info size={40} />} child="About Us" route="/about" />
          </div>
        </section>
      </nav>
    </>
  )
} 

export default Navbar; 