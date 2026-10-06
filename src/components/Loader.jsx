import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-12 h-12 border-4 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin'></div>
        <p className='mt-2 text-blue-500 font-semibold'>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
