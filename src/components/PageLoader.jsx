const PageLoader = () => {
  return (
    <div className='fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-[9999] pointer-events-none'>
      <div className='absolute top-0 left-0 h-full w-full bg-blue-500 origin-left animate-[load-indeterminate_1.5s_infinite_ease-in-out]' />
    </div>
  );
};

export default PageLoader;
