
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CourtCard } from "@/components/CourtCard";
import { FilterSection } from "@/components/FilterSection";
import { Header } from "@/components/Header";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const Index = () => {
  const { courts, loading, error } = useGoogleSheetData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourtType, setSelectedCourtType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const filteredCourts = useMemo(() => {
    return courts.filter((court) => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourtType = selectedCourtType === "All" || court.courtType === selectedCourtType;
      const matchesPriceRange = selectedPriceRange === "All" || court.priceRange === selectedPriceRange;
      
      return matchesSearch && matchesCourtType && matchesPriceRange;
    });
  }, [courts, searchTerm, selectedCourtType, selectedPriceRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-green-600">Loading tennis courts...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-red-600">Error: {error}</p>
            <p className="text-green-500 mt-2">Please check if the Google Sheet is publicly accessible.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Tennis Court Directory
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Discover premier tennis facilities around the world. Find the perfect court for your next match.
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <FilterSection 
          selectedCourtType={selectedCourtType}
          onCourtTypeChange={setSelectedCourtType}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={setSelectedPriceRange}
        />

        <div className="mb-6">
          <p className="text-green-700">
            Showing {filteredCourts.length} of {courts.length} tennis courts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        {filteredCourts.length === 0 && courts.length > 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-green-600">No courts found matching your criteria.</p>
            <p className="text-green-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
