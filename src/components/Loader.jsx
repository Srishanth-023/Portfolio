import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-xl font-light tracking-[14px] text-slate-100 mb-8 mr-[-14px] opacity-90 animate-pulse'>
          SRISHANTH
        </h1>
        <div className='w-[200px] h-[1px] bg-white/10 relative overflow-hidden'>
          <div 
            className='absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-[10px] font-mono text-slate-400 mt-4 tracking-widest'>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
