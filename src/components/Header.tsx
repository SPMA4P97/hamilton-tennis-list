
import { MapPin } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-md border-b-4 border-green-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">TennisCourt Finder</h1>
              <p className="text-green-600 text-sm">Your premier tennis directory</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
