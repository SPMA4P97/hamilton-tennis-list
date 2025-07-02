
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FilterSectionProps {
  selectedCourtType: string;
  onCourtTypeChange: (type: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

export const FilterSection = ({
  selectedCourtType,
  onCourtTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
}: FilterSectionProps) => {
  return (
    <Card className="p-4 mb-6 bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="text-green-700 font-medium">Filter by:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <Select value={selectedCourtType} onValueChange={onCourtTypeChange}>
              <SelectTrigger className="w-48 border-green-200 focus:border-green-500">
                <SelectValue placeholder="Court Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-green-200">
                <SelectItem value="All">All Court Types</SelectItem>
                <SelectItem value="Hard">Hard Court</SelectItem>
                <SelectItem value="Clay">Clay Court</SelectItem>
                <SelectItem value="Grass">Grass Court</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="w-48 border-green-200 focus:border-green-500">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-white border-green-200">
                <SelectItem value="All">All Price Ranges</SelectItem>
                <SelectItem value="£">Budget (£)</SelectItem>
                <SelectItem value="££">Moderate (££)</SelectItem>
                <SelectItem value="£££">Premium (£££)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
