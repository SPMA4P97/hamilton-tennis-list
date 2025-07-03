
import { MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Court {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  courtType: string;
  numberOfCourts: number;
  amenities: string[];
  priceRange: string;
  rating: number;
  image: string;
  description: string;
  seasonalOpportunity?: string;
  lighting?: string;
  lineMarkings?: string;
}

interface CourtCardProps {
  court: Court;
}

export const CourtCard = ({ court }: CourtCardProps) => {
  // Use a generic tennis court placeholder image
  const placeholderImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop";
  
  // Helper function to get tag styling based on exact specifications
  const getTagStyling = (field: string, value: string) => {
    const baseClasses = "text-xs rounded-full px-3 py-1 font-medium";
    
    switch (field) {
      case 'seasonalOpportunity':
        if (value === 'All Year') return `${baseClasses} bg-green-100 text-green-800`;
        if (value === 'Summer Only') return `${baseClasses} bg-yellow-100 text-yellow-800`;
        break;
      case 'courtType':
        if (value === 'Hard Court' || value === 'Hard') return `${baseClasses} bg-blue-900 text-white`;
        if (value === 'Clay Court' || value === 'Clay') return `${baseClasses} bg-orange-200 text-orange-900`;
        if (value === 'Grass Court' || value === 'Grass') return `${baseClasses} bg-green-200 text-green-800`;
        break;
      case 'lighting':
        if (value === 'Yes' || value === 'Lit') return `${baseClasses} bg-yellow-100 text-yellow-800`;
        if (value === 'No' || value === 'Unlit') return `${baseClasses} bg-gray-100 text-gray-700`;
        break;
      case 'lineMarkings':
        if (value === 'Tennis') return `${baseClasses} bg-green-100 text-green-800`;
        if (value === 'Pickleball') return `${baseClasses} bg-green-200 text-green-800`;
        if (value === 'Tennis + Pickleball') return `${baseClasses} bg-green-800 text-white`;
        break;
    }
    
    // Default styling
    return `${baseClasses} bg-slate-100 text-slate-700`;
  };

  // Helper function to format display value
  const formatDisplayValue = (field: string, value: string) => {
    if (field === 'lighting') {
      return value === 'Yes' ? 'Lit' : value === 'No' ? 'Unlit' : value;
    }
    if (field === 'lineMarkings') {
      return value.replace(/\s*Lines\s*/gi, '').trim();
    }
    return value;
  };

  // Create array of tags to display in exact order specified
  const tags = [
    { field: 'seasonalOpportunity', value: court.seasonalOpportunity },
    { field: 'courtType', value: court.courtType },
    { field: 'lighting', value: court.lighting },
    { field: 'lineMarkings', value: court.lineMarkings }
  ].filter(tag => tag.value && tag.value.trim() !== '');
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
      <div className="relative">
        <img
          src={placeholderImage}
          alt="Tennis court"
          className="w-full h-48 object-cover"
        />
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="text-xl font-semibold text-slate-800 leading-tight">
          {court.name}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start text-slate-600 text-sm">
          <MapPin className="h-4 w-4 mr-2 text-slate-500 mt-0.5 flex-shrink-0" />
          <span className="leading-tight">{court.location}</span>
        </div>
        
        <div className="flex items-center text-slate-600 text-sm">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>{court.numberOfCourts} {court.numberOfCourts === 1 ? 'Court' : 'Courts'}</span>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className={getTagStyling(tag.field, tag.value)}
              >
                {formatDisplayValue(tag.field, tag.value)}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
