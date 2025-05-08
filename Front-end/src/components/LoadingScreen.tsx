const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        {/* Simple Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
