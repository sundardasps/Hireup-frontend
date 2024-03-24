import { Typography } from '@material-tailwind/react';
import React from 'react';
import { BarLoader } from 'react-spinners';

function MainLoading({ showLogo = true, loaderProps = {} }) {
  return (
    <div className='h-screen flex justify-center items-center animate-pulse zoomInOut'>

       <div className=''>
          <div className="font-extrabold text-2xl cursor-pointer text-blue-500  flex items-center gap-1">
          <span>HireUp</span>
         </div>
       
        <BarLoader className=' m-auto mt-1' {...loaderProps} />
        
      </div>

    </div>
  );
}

export default MainLoading;
