
import { useEffect, useRef } from 'react';

interface Court {
  id: number;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  courts: Court[];
  mapboxToken?: string;
}

export const MapView = ({ courts, mapboxToken }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !window.google) return;

    // Initialize Google Map
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: 10,
      center: { lat: 43.6532, lng: -79.3832 }, // Default to Toronto
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9d6e5" }]
        }
      ]
    });

    // Add markers for courts with coordinates
    courts.forEach(court => {
      if (court.latitude && court.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: court.latitude, lng: court.longitude },
          map: map.current,
          title: court.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#2563eb',
            fillOpacity: 1,
            strokeColor: '#1e40af',
            strokeWeight: 2,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-slate-800">${court.name}</h3>
              <p class="text-sm text-slate-600">${court.location}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current, marker);
        });
      }
    });

    // Adjust map bounds to show all markers
    const bounds = new window.google.maps.LatLngBounds();
    courts.forEach(court => {
      if (court.latitude && court.longitude) {
        bounds.extend({ lat: court.latitude, lng: court.longitude });
      }
    });
    
    if (courts.some(court => court.latitude && court.longitude)) {
      map.current.fitBounds(bounds);
    }

  }, [courts]);

  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg border border-slate-200">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
