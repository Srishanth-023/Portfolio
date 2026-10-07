const PageLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-slate-900'>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-light tracking-[14px] text-slate-100 mb-8 mr-[-14px] opacity-90 animate-pulse'>
          SRISHANTH
        </h1>
        <div className='w-[200px] h-[1px] bg-white/10 relative overflow-hidden'>
          <div className='absolute top-0 left-0 h-full w-full bg-white origin-left animate-[load-indeterminate_1.5s_infinite_ease-in-out]' />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
