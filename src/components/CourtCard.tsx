
import { MapPin, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
}

interface CourtCardProps {
  court: Court;
}

export const CourtCard = ({ court }: CourtCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-slate-200">
      <div className="relative">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-slate-600 text-white hover:bg-slate-700">
            {court.courtType}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-slate-800 line-clamp-1">
            {court.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-600">{court.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-600 text-sm line-clamp-2">{court.description}</p>
        
        <div className="flex items-center text-slate-600 text-sm">
          <MapPin className="h-4 w-4 mr-2 text-slate-500" />
          <span className="line-clamp-1">{court.location}</span>
        </div>
        
        <div className="flex items-center text-slate-600 text-sm">
          <Users className="h-4 w-4 mr-2 text-slate-500" />
          <span>{court.numberOfCourts} Courts Available</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            {court.seasonalOpportunity || 'All Year'}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {court.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs border-slate-300 text-slate-600">
              {amenity}
            </Badge>
          ))}
          {court.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
              +{court.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
