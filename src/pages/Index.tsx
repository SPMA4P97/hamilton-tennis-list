import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CourtCard } from "@/components/CourtCard";
import { EnhancedFilterSection } from "@/components/EnhancedFilterSection";
import { Header } from "@/components/Header";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const Index = () => {
  const { courts, loading, error } = useGoogleSheetData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourtType, setSelectedCourtType] = useState("All");
  const [selectedSeasonalOpportunity, setSelectedSeasonalOpportunity] = useState("All");
  const [selectedLighting, setSelectedLighting] = useState("All");
  const [selectedLineMarkings, setSelectedLineMarkings] = useState("All");

  const filteredCourts = useMemo(() => {
    return courts.filter((court) => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourtType = selectedCourtType === "All" || court.courtType === selectedCourtType;
      const matchesSeasonalOpportunity = selectedSeasonalOpportunity === "All" || court.seasonalOpportunity === selectedSeasonalOpportunity;
      const matchesLighting = selectedLighting === "All" || court.lighting === selectedLighting;
      const matchesLineMarkings = selectedLineMarkings === "All" || court.lineMarkings === selectedLineMarkings;
      
      return matchesSearch && matchesCourtType && matchesSeasonalOpportunity && matchesLighting && matchesLineMarkings;
    });
  }, [courts, searchTerm, selectedCourtType, selectedSeasonalOpportunity, selectedLighting, selectedLineMarkings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">Loading tennis courts...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-red-600">Error: {error}</p>
            <p className="text-slate-500 mt-2">Please check if the Google Sheet is publicly accessible.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Hamilton Tennis Court Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find your home court advantage — discover tennis courts near you.
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <EnhancedFilterSection 
          selectedCourtType={selectedCourtType}
          onCourtTypeChange={setSelectedCourtType}
          selectedSeasonalOpportunity={selectedSeasonalOpportunity}
          onSeasonalOpportunityChange={setSelectedSeasonalOpportunity}
          selectedLighting={selectedLighting}
          onLightingChange={setSelectedLighting}
          selectedLineMarkings={selectedLineMarkings}
          onLineMarkingsChange={setSelectedLineMarkings}
        />

        <div className="mb-6">
          <p className="text-slate-700 font-medium">
            Showing {filteredCourts.length} of {courts.length} tennis courts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        {filteredCourts.length === 0 && courts.length > 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No courts found matching your criteria.</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
