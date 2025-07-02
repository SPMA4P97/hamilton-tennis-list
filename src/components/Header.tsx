
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-md border-b-4 border-slate-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-600 p-3 rounded-full">
              <img 
                src="/lovable-uploads/ad424f2e-abb0-4159-8020-b124afc55dcb.png" 
                alt="Hamilton Tennis Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Hamilton Tennis Courts</h1>
              <p className="text-slate-600 text-sm">City of Hamilton Recreation Directory</p>
            </div>
          </div>
          
          <nav className="flex space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/map"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                location.pathname === '/map'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
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
