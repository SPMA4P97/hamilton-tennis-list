
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EnhancedFilterSectionProps {
  selectedCourtType: string;
  onCourtTypeChange: (type: string) => void;
  selectedSeasonalOpportunity: string;
  onSeasonalOpportunityChange: (opportunity: string) => void;
  selectedLighting: string;
  onLightingChange: (lighting: string) => void;
  selectedLineMarkings: string;
  onLineMarkingsChange: (markings: string) => void;
}

export const EnhancedFilterSection = ({
  selectedCourtType,
  onCourtTypeChange,
  selectedSeasonalOpportunity,
  onSeasonalOpportunityChange,
  selectedLighting,
  onLightingChange,
  selectedLineMarkings,
  onLineMarkingsChange,
}: EnhancedFilterSectionProps) => {
  return (
    <Card className="p-6 mb-6 bg-white shadow-sm border border-slate-200">
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-slate-700 font-medium text-lg">Filter Tennis Courts</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="text-slate-600 text-sm font-medium mb-2 block">Court Type</Label>
            <Select value={selectedCourtType} onValueChange={onCourtTypeChange}>
              <SelectTrigger className="border-slate-300 focus:border-slate-500">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="All">All Court Types</SelectItem>
                <SelectItem value="Hard">Hard Court</SelectItem>
                <SelectItem value="Clay">Clay Court</SelectItem>
                <SelectItem value="Grass">Grass Court</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-600 text-sm font-medium mb-2 block">Seasonal Availability</Label>
            <Select value={selectedSeasonalOpportunity} onValueChange={onSeasonalOpportunityChange}>
              <SelectTrigger className="border-slate-300 focus:border-slate-500">
                <SelectValue placeholder="All Seasons" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="All Year">All Year</SelectItem>
                <SelectItem value="Summer only">Summer Only</SelectItem>
                <SelectItem value="Winter only">Winter Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-600 text-sm font-medium mb-2 block">Lighting</Label>
            <Select value={selectedLighting} onValueChange={onLightingChange}>
              <SelectTrigger className="border-slate-300 focus:border-slate-500">
                <SelectValue placeholder="Any Lighting" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="All">Any Lighting</SelectItem>
                <SelectItem value="Yes">Lighting</SelectItem>
                <SelectItem value="No">No Lighting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-600 text-sm font-medium mb-2 block">Line Markings</Label>
            <Select value={selectedLineMarkings} onValueChange={onLineMarkingsChange}>
              <SelectTrigger className="border-slate-300 focus:border-slate-500">
                <SelectValue placeholder="All Markings" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="All">All Markings</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Pickleball">Pickleball</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
