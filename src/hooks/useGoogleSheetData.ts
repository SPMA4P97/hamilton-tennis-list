
import { useState, useEffect } from 'react';

interface CourtData {
  id: number;
  name: string;
  address: string;
  location: string;
  courtType: string;
  numberOfCourts: number;
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
          
          // Clean up court type - handle multiple types and remove "facility" mentions
          const rawCourtType = values[10] || 'Hard';
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
            name: values[2]?.trim() || 'Unnamed Court',
            address: values[3]?.trim() || '',
            location: values[1]?.trim() || values[3]?.trim() || 'Unknown',
            courtType: cleanCourtType,
            numberOfCourts: parseInt(values[6]) || 1,
            rating: parseFloat(values[13]) || 4.0,
            image: values[23]?.trim() || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
            description: values[15]?.trim() || `${values[1]?.trim() || 'Unknown'} facility`,
            latitude: values[16] ? parseFloat(values[16]) : undefined,
            longitude: values[17] ? parseFloat(values[17]) : undefined,
            seasonalOpportunity: values[8]?.trim() || 'All Year',
            lighting: values[9]?.trim() || 'No',
            lineMarkings: values[12]?.trim() || 'Tennis',
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
