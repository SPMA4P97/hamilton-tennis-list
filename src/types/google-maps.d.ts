
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        InfoWindow: any;
        LatLngBounds: any;
        SymbolPath: {
          CIRCLE: any;
        };
      };
    };
  }
}

export {};
