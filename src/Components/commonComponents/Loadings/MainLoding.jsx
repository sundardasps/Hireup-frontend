
import { GooSpinner } from 'react-spinners-kit';

function MainLoading({loading}) {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>

      {/* <YourLogo /> */}

      {/* GooSpinner */}
      <div className='mt-4'>
        <GooSpinner  loading={loading} />
      </div>
    </div>
  );
}

export default MainLoading;
