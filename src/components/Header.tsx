
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-md border-b-4 border-slate-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-3 rounded-full border-2 border-black">
              <img 
                src="/lovable-uploads/15f2d297-3580-404e-82df-e973d3ba0ac7.png" 
                alt="Hamilton Tennis Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Hamilton Tennis Courts</h1>
              <p className="text-slate-600 text-sm">Opportunities for Tennis in Hamilton</p>
            </div>
          </div>
          
          <nav className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
            <Link
              to="/"
              className={`px-6 py-3 rounded-md font-semibold text-sm transition-all ${
                location.pathname === '/'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              Home
            </Link>
            <Link
              to="/map"
              className={`px-6 py-3 rounded-md font-semibold text-sm transition-all ${
                location.pathname === '/map'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              Map
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
