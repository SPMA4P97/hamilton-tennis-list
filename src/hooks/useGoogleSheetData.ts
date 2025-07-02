
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
          
          // Map the values based on actual column order:
          // Confirmed, Classification, Open?, Location Name, Address, Cost, Outdoor Courts #, Indoor Courts #, Total Courts #, 
          // Indoor/Outdoor/Both, Seasonal Opportunity, Lighting, Court Type, Court Type Notes, Lines?, Condition /10, 
          // Surfaced?, Location Notes, Latitude, Longitude, Confirmed Lat/Long., Club LINK, Ward, Ward Pop. Serve
          
          const court: CourtData = {
            id: index + 1,
            name: values[3] || 'Unnamed Court', // Location Name
            location: values[4] || 'Unknown Location', // Address
            address: values[4] || '', // Address
            phone: '', // Not in sheet
            courtType: values[12] || 'Hard', // Court Type
            numberOfCourts: parseInt(values[8]) || 1, // Total Courts #
            amenities: values[11] ? [values[11]] : [], // Lighting as amenity
            priceRange: values[5] === 'Membership' ? '£££' : values[5] === 'Rental' ? '££' : '£', // Cost
            rating: 4.0, // Default rating
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop', // Default image
            description: values[17] || `${values[1]} facility`, // Location Notes or Classification
            latitude: values[18] ? parseFloat(values[18]) : undefined, // Latitude
            longitude: values[19] ? parseFloat(values[19]) : undefined, // Longitude
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
