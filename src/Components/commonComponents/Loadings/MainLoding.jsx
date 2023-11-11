import React from 'react';
import { GooSpinner } from 'react-spinners-kit';
// import YourLogo from './path-to-your-logo'; // Import your logo component or image

function MainLoading() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>

      {/* <YourLogo /> */}

      {/* GooSpinner */}
      <div className='mt-4'>
        <GooSpinner />
      </div>
    </div>
  );
}

export default MainLoading;
