
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
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline" className="text-xs bg-slate-50 border-slate-300 text-slate-700 rounded-full px-3 py-1">
            {court.courtType}
          </Badge>
          
          {court.seasonalOpportunity && (
            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700 rounded-full px-3 py-1">
              {court.seasonalOpportunity}
            </Badge>
          )}
          
          {court.lighting && (
            <Badge variant="outline" className={`text-xs rounded-full px-3 py-1 ${
              court.lighting === 'Yes' 
                ? 'bg-yellow-100 border-yellow-300 text-yellow-800' 
                : 'bg-gray-100 border-gray-300 text-gray-700'
            }`}>
              {court.lighting === 'Yes' ? 'Lit' : 'Unlit'}
            </Badge>
          )}
          
          {court.lineMarkings && (
            <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700 rounded-full px-3 py-1">
              {court.lineMarkings} Lines
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
