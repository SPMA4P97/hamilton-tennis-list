
import { Phone, MapPin, Star, Users } from "lucide-react";
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
}

interface CourtCardProps {
  court: Court;
}

export const CourtCard = ({ court }: CourtCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-green-100">
      <div className="relative">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
            {court.courtType}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-green-800 line-clamp-1">
            {court.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{court.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-green-600 text-sm line-clamp-2">{court.description}</p>
        
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-green-500" />
          <span className="line-clamp-1">{court.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Phone className="h-4 w-4 mr-1 text-green-500" />
          <span>{court.phone}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="h-4 w-4 mr-1 text-green-500" />
          <span>{court.numberOfCourts} Courts Available</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-green-600 font-semibold text-lg">
            {court.priceRange}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {court.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs border-green-200 text-green-700">
              {amenity}
            </Badge>
          ))}
          {court.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              +{court.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
