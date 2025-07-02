
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CourtCard } from "@/components/CourtCard";
import { FilterSection } from "@/components/FilterSection";
import { Header } from "@/components/Header";

// Mock data that would typically come from Google Sheets
const mockCourtData = [
  {
    id: 1,
    name: "Wimbledon Tennis Club",
    location: "London, England",
    address: "Church Rd, Wimbledon, London SW19 5AE",
    phone: "+44 20 8946 2244",
    courtType: "Grass",
    numberOfCourts: 18,
    amenities: ["Pro Shop", "Restaurant", "Parking", "Locker Rooms"],
    priceRange: "£££",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    description: "The world's most famous tennis venue, home of The Championships."
  },
  {
    id: 2,
    name: "Central Park Tennis Center",
    location: "New York, NY",
    address: "Central Park, New York, NY 10024",
    phone: "(212) 280-0205",
    courtType: "Hard",
    numberOfCourts: 26,
    amenities: ["Pro Shop", "Lessons", "Parking", "Equipment Rental"],
    priceRange: "££",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop",
    description: "Premier tennis facility in the heart of Manhattan."
  },
  {
    id: 3,
    name: "Roland Garros Tennis Club",
    location: "Paris, France",
    address: "2 Avenue Gordon Bennett, 75016 Paris",
    phone: "+33 1 47 43 48 00",
    courtType: "Clay",
    numberOfCourts: 20,
    amenities: ["Restaurant", "Museum", "Pro Shop", "Parking"],
    priceRange: "£££",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    description: "Home of the French Open, featuring premier clay courts."
  },
  {
    id: 4,
    name: "Melbourne Park Tennis Centre",
    location: "Melbourne, Australia",
    address: "Olympic Blvd, Melbourne VIC 3000",
    phone: "+61 3 9286 1600",
    courtType: "Hard",
    numberOfCourts: 24,
    amenities: ["Food Court", "Retail", "Parking", "Public Transport"],
    priceRange: "££",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop",
    description: "Australian Open venue with state-of-the-art facilities."
  },
  {
    id: 5,
    name: "Arthur Ashe Tennis Center",
    location: "Queens, NY",
    address: "Flushing Meadows Corona Park, Queens, NY",
    phone: "(718) 760-6200",
    courtType: "Hard",
    numberOfCourts: 22,
    amenities: ["Food Court", "Retail Store", "Museum", "Parking"],
    priceRange: "££",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    description: "Home of the US Open Tennis Championships."
  },
  {
    id: 6,
    name: "La Quinta Resort Tennis Club",
    location: "La Quinta, CA",
    address: "49499 Eisenhower Dr, La Quinta, CA 92253",
    phone: "(760) 564-7610",
    courtType: "Hard",
    numberOfCourts: 23,
    amenities: ["Spa", "Golf Course", "Restaurant", "Resort Hotel"],
    priceRange: "£££",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop",
    description: "Luxury resort tennis facility in the California desert."
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourtType, setSelectedCourtType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const filteredCourts = useMemo(() => {
    return mockCourtData.filter((court) => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourtType = selectedCourtType === "All" || court.courtType === selectedCourtType;
      const matchesPriceRange = selectedPriceRange === "All" || court.priceRange === selectedPriceRange;
      
      return matchesSearch && matchesCourtType && matchesPriceRange;
    });
  }, [searchTerm, selectedCourtType, selectedPriceRange]);

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
            Showing {filteredCourts.length} of {mockCourtData.length} tennis courts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        {filteredCourts.length === 0 && (
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
