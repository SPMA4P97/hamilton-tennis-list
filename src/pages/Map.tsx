
import { Header } from "@/components/Header";

const Map = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Interactive Map of Hamilton Tennis Courts
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore tennis court locations throughout Hamilton with detailed information and directions.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1SH-HR6jJUjSJX5Df-lBdvObLw9J5eBM&ehbc=2E312F"
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border border-slate-200"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hamilton Tennis Courts Interactive Map"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
