const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-slate-900 text-slate-100 px-8 text-center">
      <h1 className="text-3xl font-light tracking-widest text-red-400 mb-4">SYSTEM_ERROR</h1>
      <p className="text-slate-400 mb-8 max-w-lg">
        {error.message || "An unexpected rendering error occurred. The 3D context may have been lost or an asset failed to load."}
      </p>
      <button 
        onClick={resetErrorBoundary}
        className="px-6 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors tracking-widest text-sm"
      >
        REBOOT_SYSTEM
      </button>
    </div>
  );
};

export default ErrorFallback;
