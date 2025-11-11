import Image from 'next/image';
import {
  MapPin,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { incidents, safeSpots } from '@/lib/data';

// These coordinates are percentages for placing markers on a map image.
const incidentPositions = [
  { top: '30%', left: '45%' },
  { top: '55%', left: '30%' },
  { top: '70%', left: '60%' },
];
const safeSpotPositions = [
  { top: '25%', left: '65%' },
  { top: '40%', left: '15%' },
  { top: '80%', left: '80%' },
];

export default function SafetyMapPage() {
  const mapImage = placeholderImages.find(p => p.id === 'safety-map');

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Safety Map</CardTitle>
            <CardDescription>
              Red zones are based on recent incident reports. Green zones are verified safe spots.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                {mapImage && (
                  <Image
                    src={mapImage.imageUrl}
                    alt="Safety Map"
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                  />
                )}
                {/* Render incident markers */}
                {incidents.map((incident, index) => (
                  <Tooltip key={incident.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ ...incidentPositions[index % incidentPositions.length] }}
                      >
                        <div className="relative">
                          <MapPin className="h-8 w-8 text-destructive fill-destructive/40" />
                          <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-destructive-foreground" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{incident.type} at {incident.location.name}</p>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                {/* Render safe spot markers */}
                {safeSpots.map((spot, index) => (
                  <Tooltip key={spot.id}>
                    <TooltipTrigger asChild>
                       <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ ...safeSpotPositions[index % safeSpotPositions.length] }}
                      >
                        <div className="relative">
                          <MapPin className="h-8 w-8 text-green-600 fill-green-500/40" />
                          <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                       <p className="font-semibold">{spot.type}: {spot.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
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
              <div className="relative w-8 h-8 flex-shrink-0">
                  <MapPin className="h-8 w-8 text-destructive fill-destructive/40" />
                  <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-destructive-foreground" />
              </div>
              <div>
                <p className="font-semibold">Unsafe Zone / Incident</p>
                <p className="text-sm text-muted-foreground">Area with reported incidents.</p>
              </div>
            </div>
             <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex-shrink-0">
                  <MapPin className="h-8 w-8 text-green-600 fill-green-500/40" />
                  <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
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
