import cn from "classnames";
import { Settings } from 'lucide-react';
import ConfigItem from "./gameConfigItem";
import { Skull, Frown, Smile } from 'lucide-react';
import { useState, useEffect } from "react";
import NotValidModeMsg from './notValidMode';
function GameConfig({onClickFunction}) {
  const [configOpen, setConfigOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
          {windowWidth > 640 ? 
            (<ConfigItem value="hard" icon={<Skull size={30}/>} func={onClickFunction}/>) : null
          }
        </div>
      </section>
    </div>
    {windowWidth > 640 ? 
      null : ( <NotValidModeMsg />)
    }
    </>
  )
}

export default GameConfig;