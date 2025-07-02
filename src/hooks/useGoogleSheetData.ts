
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
          
          // Map the values based on expected column order
          const court: CourtData = {
            id: index + 1,
            name: values[0] || 'Unnamed Court',
            location: values[1] || 'Unknown Location',
            address: values[2] || '',
            phone: values[3] || '',
            courtType: values[4] || 'Hard',
            numberOfCourts: parseInt(values[5]) || 1,
            amenities: values[6] ? values[6].split(';').map(a => a.trim()) : [],
            priceRange: values[7] || '££',
            rating: parseFloat(values[8]) || 4.0,
            image: values[9] || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
            description: values[10] || 'Tennis court facility',
            latitude: values[11] ? parseFloat(values[11]) : undefined,
            longitude: values[12] ? parseFloat(values[12]) : undefined,
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
