import cn from "classnames";
import { Settings } from 'lucide-react';
import ConfigItem from "./gameConfigItem";
import { Skull } from 'lucide-react';
import { Frown } from 'lucide-react';
import { Smile } from 'lucide-react';
import { useState, useEffect } from "react";

function GameConfig({onClickFunction}) {
  const [configOpen, setConfigOpen] = useState(false);

    //cerrar el config cuando clickeo la pantalla 
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.config-icon') && !event.target.closest('.config-menu')) {
          setConfigOpen(false);
        }
      };
  
      document.body.addEventListener('click', handleClickOutside);
      return () => {
        document.body.removeEventListener('click', handleClickOutside);
      };
    }, []);

  return (
    <>
    <div>
      <section>
        <div className="bg-gray-100 rounded hover:cursor-pointer" onClick={() => setConfigOpen(!configOpen)}>
          <Settings className="config-icon" size={30} />
        </div>
        <div className={cn("config-menu absolute flex flex-col mt-2 gap-2 shadow-md bg-white rounded transition ease-in-out duration-300",
          {
            "invisible opacity-0": configOpen === false, 
            "visible opacity-100": configOpen === true
          }
        )}>
          <ConfigItem value="easy" icon={<Smile size={30}/>} func={onClickFunction}/>
          <ConfigItem value="medium" icon={<Frown size={30}/>} func={onClickFunction}/>
          <ConfigItem value="hard" icon={<Skull size={30}/>} func={onClickFunction}/>
        </div>
      </section>
    </div>
    </>
  )
}

export default GameConfig;