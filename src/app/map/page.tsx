
'use client';

import {
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { incidents, safeSpots } from '@/lib/data';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';
import React from 'react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const center = {
  lat: 34.0522,
  lng: -118.2437
};

export default function SafetyMapPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedMarker, setSelectedMarker] = React.useState<any>(null);
  const mapImage = placeholderImages.find(p => p.id === "safety-map");

  const onSelectMarker = (marker: any) => {
    setSelectedMarker(marker);
  };

  const mapContent = isLoaded ? (
     <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {incidents.map((incident) => (
          <MarkerF
            key={incident.id}
            position={{ lat: incident.location.lat, lng: incident.location.lng }}
            icon={{
              url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="hsl(var(--destructive))" stroke="white" stroke-width="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
            onClick={() => onSelectMarker(incident)}
          />
        ))}
        {safeSpots.map((spot) => (
          <MarkerF
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            icon={{
              url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="rgb(22 163 74)" stroke="white" stroke-width="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
               scaledSize: new window.google.maps.Size(40, 40)
            }}
            onClick={() => onSelectMarker(spot)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.location?.lat || selectedMarker.lat, lng: selectedMarker.location?.lng || selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p className="font-semibold">{selectedMarker.type}: {selectedMarker.name || selectedMarker.location.name}</p>
              {selectedMarker.description && <p className="text-sm text-muted-foreground">{selectedMarker.description}</p>}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
  ) : <div>Loading map...</div>;

  if (loadError) {
    return <div>Error loading maps. Please ensure you have a valid Google Maps API key.</div>
  }
  
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Safety Map</CardTitle>
                    <CardDescription>
                      Red markers are incident reports. Green markers are verified safe spots.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                        {mapImage && (
                          <Image
                            src={mapImage.imageUrl}
                            alt="Placeholder map"
                            fill
                            className="object-cover"
                            data-ai-hint={mapImage.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                            <CardTitle className="mb-2">API Key Missing</CardTitle>
                            <CardDescription className="max-w-sm mb-4">
                                To activate the interactive map, please add your Google Maps API Key to the `.env.local` file.
                            </CardDescription>
                            <code className="bg-muted/80 p-2 rounded-md text-xs">
                                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
                            </code>
                        </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
             <div className="md:col-span-1 flex flex-col gap-6">
                <Card>
                <CardHeader>
                    <CardTitle>Map Legend</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="hsl(var(--destructive))" stroke="white" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                        <p className="font-semibold">Unsafe Zone / Incident</p>
                        <p className="text-sm text-muted-foreground">Area with reported incidents.</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="rgb(22 163 74)" stroke="white" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                        <p className="font-semibold">Safe Spot</p>
                        <p className="text-sm text-muted-foreground">Police stations, hospitals, etc.</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Incidents</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {incidents.slice(0, 3).map(incident => (
                        <div key={incident.id} className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">{incident.location.name}</p>
                                <p className="text-xs text-muted-foreground">{incident.description}</p>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Safety Map</CardTitle>
            <CardDescription>
              Red markers are incident reports. Green markers are verified safe spots.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                {mapContent}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Map Legend</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="hsl(var(--destructive))" stroke="white" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <p className="font-semibold">Unsafe Zone / Incident</p>
                <p className="text-sm text-muted-foreground">Area with reported incidents.</p>
              </div>
            </div>
             <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="rgb(22 163 74)" stroke="white" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <p className="font-semibold">Safe Spot</p>
                <p className="text-sm text-muted-foreground">Police stations, hospitals, etc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {incidents.slice(0, 3).map(incident => (
              <div key={incident.id} className="flex items-start gap-3">
                 <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                 <div>
                    <p className="font-semibold text-sm">{incident.location.name}</p>
                    <p className="text-xs text-muted-foreground">{incident.description}</p>
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    