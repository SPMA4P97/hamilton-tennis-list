
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
          
          // Clean up court type - remove "facility" mentions
          const rawCourtType = values[12] || 'Hard';
          const cleanCourtType = rawCourtType.replace(/\s*facility\s*/gi, '').trim();
          
          const court: CourtData = {
            id: index + 1,
            name: values[3] || 'Unnamed Court', // Location Name
            location: values[4] || 'Unknown Location', // Address
            address: values[4] || '', // Address
            phone: '', // Not displayed
            courtType: cleanCourtType, // Court Type (cleaned)
            numberOfCourts: parseInt(values[8]) || 1, // Total Courts #
            amenities: values[11] ? [values[11]] : [], // Lighting as amenity
            priceRange: '', // Not displayed
            rating: 4.0, // Default rating
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop', // Default image
            description: values[17] || `${values[1]}`, // Location Notes or Classification
            latitude: values[18] ? parseFloat(values[18]) : undefined, // Latitude
            longitude: values[19] ? parseFloat(values[19]) : undefined, // Longitude
            seasonalOpportunity: values[10] || 'All Year', // Seasonal Opportunity
            lighting: values[11] || 'No', // Lighting
            lineMarkings: values[14] || 'Tennis', // Lines?
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
