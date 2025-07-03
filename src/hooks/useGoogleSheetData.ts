
import { useState, useEffect } from 'react';

interface CourtData {
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
  latitude?: number;
  longitude?: number;
  seasonalOpportunity?: string;
  lighting?: string;
  lineMarkings?: string;
}

export const useGoogleSheetData = () => {
  const [courts, setCourts] = useState<CourtData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1ZghEOmrIgbT8PIoR-5-ysZWNohyGHz-WEEU-BpeL5_U/export?format=csv');
        const csvText = await response.text();
        
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
        
        console.log('Headers from Google Sheet:', headers);
        
        const parsedCourts: CourtData[] = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(value => value.replace(/"/g, '').trim());
          
          // Updated column mapping based on actual headers:
          // 0: Confirmed, 1: Classification, 2: Open?, 3: Location Name, 4: Address, 
          // 5: Outdoor Courts #, 6: Indoor Courts #, 7: Total Courts #, 8: Indoor/Outdoor/Both,
          // 9: Seasonal Opportunity, 10: Lighting, 11: Court Type, 12: Court Type Notes,
          // 13: Lines, 14: Condition /10, 15: Surfaced?, 16: Location Notes,
          // 17: Latitude, 18: Longitude, 19: Confirmed Lat/Long., 20: Club LINK,
          // 21: Ward, 22: Ward Pop. Serve, 23: Cost, 24: Image
          
          // Clean up court type - handle multiple types and remove "facility" mentions
          const rawCourtType = values[11] || 'Hard';
          let cleanCourtType = rawCourtType.replace(/\s*facility\s*/gi, '').trim();
          
          // Handle multiple court types - take the first one for filtering
          if (cleanCourtType.includes(',')) {
            cleanCourtType = cleanCourtType.split(',')[0].trim();
          }
          if (cleanCourtType.toLowerCase().includes('har-tru')) {
            cleanCourtType = 'Clay';
          } else if (cleanCourtType.toLowerCase().includes('hard')) {
            cleanCourtType = 'Hard';
          } else if (cleanCourtType.toLowerCase().includes('clay')) {
            cleanCourtType = 'Clay';
          } else if (cleanCourtType.toLowerCase().includes('grass')) {
            cleanCourtType = 'Grass';
          }

          const court: CourtData = {
            id: index + 1,
            name: values[3] || 'Unnamed Court', // Location Name
            location: values[4] || 'Unknown Location', // Address
            address: values[4] || '', // Address
            phone: '', // Not provided in data
            courtType: cleanCourtType, // Court Type (cleaned)
            numberOfCourts: parseInt(values[7]) || 1, // Total Courts #
            amenities: values[10] ? [values[10]] : [], // Lighting as amenity
            priceRange: values[23] || '', // Cost
            rating: 4.0, // Default rating
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop', // Default image
            description: values[16] || `${values[1]} facility`, // Location Notes or Classification
            latitude: values[17] ? parseFloat(values[17]) : undefined, // Latitude
            longitude: values[18] ? parseFloat(values[18]) : undefined, // Longitude
            seasonalOpportunity: values[9] || 'All Year', // Seasonal Opportunity
            lighting: values[10] || 'No', // Lighting
            lineMarkings: values[13] || 'Tennis', // Lines
          };
          
          return court;
        });
        
        console.log('Parsed courts data:', parsedCourts);
        setCourts(parsedCourts);
        setError(null);
      } catch (err) {
        console.error('Error fetching Google Sheet data:', err);
        setError('Failed to load court data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { courts, loading, error };
};
