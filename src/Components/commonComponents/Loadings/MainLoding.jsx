import React from 'react';
import { BarLoader } from 'react-spinners';

function MainLoading({ showLogo = true, loaderProps = {} }) {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div>
        <img src="/public/logo.png" alt="" />
      </div>

      <div className='mt-4'>
        <BarLoader {...loaderProps} />
      </div>
    </div>
  );
}

export default MainLoading;
