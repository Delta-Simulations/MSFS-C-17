import React, { useEffect, useState } from "react";
import { useSimVar } from '../../Hooks/simVars';

export const IRCMPanel = (props) => {

  const [AC_ON_GROUND] = useSimVar('A:SIM ON GROUND', 'bool');
  const [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool');
  const [IRCM_ON] = useSimVar('L:C17_IRCM_MODE', 'enum');
  let [isFlashing, setIsFlashing] = useState(true);

  // Start flashing when IRCM_ON is equal to 2
  useEffect(() => {
    if (IRCM_ON === 2) {
      const intervalId = setInterval(() => {
        setIsFlashing((prevIsFlashing) => !prevIsFlashing);
      }, 200); // Flash every 500ms
  
      return () => clearInterval(intervalId);
    }
  }, [IRCM_ON]);

  const isVisible = IRCM_ON >= 1;

  if (!isVisible) {
    return null; // If IRCM_ON is less than 1, don't render anything
  }


    return(
        <g>
            <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} x={828} y={42} height={100} xlinkHref="/Images/IRCM.png"  opacity={0.2}/>

      <text x={875} y={82} fontSize={25} className='IRCMTEST' fill={'#C6C6C6'} textAnchor="middle">
        {IRCM_ON === 2 ? "TEST" : "MW"}
      </text>

      <text x={801} y={365} fontSize={18} fill='yellow' className="WAPanel" visibility={AC_ON_GROUND ? 'visible' : 'hidden'} textAnchor="middle">NO</text>
      <text x={813} y={365} fontSize={18} visibility={AC_ON_GROUND ? 'visible' : 'hidden'} fill='yellow' className="WAPanel" textAnchor="start">GO</text>

      <text x={813} y={365} fontSize={18} visibility={AC_ON_GROUND ? 'visible' : 'hidden'} fill='yellow' className="WAPanel" textAnchor="start">GO</text>


      <text x={846} y={365} fontSize={18} visibility={AC_ON_GROUND ? 'hidden' : 'visible'} fill='#00EE00' className="WAPanel" textAnchor="start">GO</text>
      <text x={897} y={365} fontSize={18} visibility={IRCM_ON === 2 ? 'visible' : 'hidden'} fill='#00EE00' className="WAPanel" textAnchor="start">DISPENSE RDY</text>

      <text x={813} y={390} fontSize={18} fill='#00EE00' className="WAPanel" textAnchor="start">0</text>
      <text x={867} y={390} fontSize={18} fill='#00EE00' className="WAPanel" textAnchor="start">0</text>
      <text x={921} y={390} fontSize={18} fill='#00EE00' className="WAPanel" textAnchor="start">15</text>
      <text x={971} y={390} fontSize={18} fill='#00EE00' className="WAPanel" textAnchor="start">30</text>



           <text x={839} y={120} fontSize={25} fill={'#C6C6C6'} className='IRCMTEST' textAnchor="start" visibility={IRCM_ON === 2 ? 'visible' : 'hidden'} >XXX</text>
           <text x={898} y={110} fontSize={20} fill={'#C6C6C6'} className='IRCMTEST' textAnchor="start" visibility={IRCM_ON === 2 ? 'visible' : 'hidden'} >o</text>

           <image xlinkHref="/Images/EFB/IRCM.svg" x={919} y={42} width="100" height="100" visibility={isFlashing ? 'visible' : 'hidden'} />
           <image xlinkHref="/Images/EFB/IRCM.svg" x={919} y={42} width="100" height="100" opacity="0.1" />


        </g>
    )
};
