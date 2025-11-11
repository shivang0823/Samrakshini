'use client';

import { useState, useEffect } from 'react';
import { Siren, ShieldAlert, User, Phone, Navigation } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { volunteers, Volunteer } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';

// Haversine formula to calculate distance between two lat/lng points
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};


export function PanicButton() {
  const [sosActivated, setSosActivated] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'searching' | 'dispatching' | 'en_route' | 'idle'>('idle');
  const [dispatchedVolunteer, setDispatchedVolunteer] = useState<Volunteer | null>(null);
  const [progress, setProgress] = useState(0);

  const findNearestVolunteer = (userLat: number, userLng: number) => {
    let nearestVolunteer: Volunteer | null = null;
    let minDistance = Infinity;

    volunteers.forEach(volunteer => {
      const distance = getDistance(userLat, userLng, volunteer.location.lat, volunteer.location.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestVolunteer = volunteer;
      }
    });

    return nearestVolunteer;
  };

  const handleSOS = () => {
    // In a real app, you'd get the user's actual location
    // navigator.geolocation.getCurrentPosition(...)
    const userLocation = { lat: 34.053, lng: -118.244 }; // Mock user location near downtown LA

    setSosActivated(true);
    setDispatchStatus('searching');
    setProgress(10);
  };

  const resetState = () => {
    setSosActivated(false);
    setDispatchStatus('idle');
    setDispatchedVolunteer(null);
    setProgress(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (dispatchStatus === 'searching') {
      timer = setTimeout(() => {
        const userLocation = { lat: 34.053, lng: -118.244 }; // Mock user location
        const volunteer = findNearestVolunteer(userLocation.lat, userLocation.lng);
        setDispatchedVolunteer(volunteer);
        setDispatchStatus('dispatching');
        setProgress(50);
      }, 3000); // Simulate search time
    } else if (dispatchStatus === 'dispatching') {
      timer = setTimeout(() => {
        setDispatchStatus('en_route');
        setProgress(100);
      }, 2000); // Simulate dispatch confirmation time
    }
    return () => clearTimeout(timer);
  }, [dispatchStatus]);

  const volunteerAvatar = placeholderImages.find(p => p.id === dispatchedVolunteer?.avatar);

  if (sosActivated) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md w-full bg-card rounded-xl shadow-2xl p-8 border">
          {dispatchStatus === 'searching' && (
            <>
              <ShieldAlert className="mx-auto h-20 w-20 text-primary animate-pulse" />
              <h1 className="text-3xl font-bold text-primary mt-4">Contacting Help...</h1>
              <p className="text-muted-foreground mt-2">Searching for the nearest available volunteer.</p>
              <Progress value={progress} className="w-full mt-6" />
            </>
          )}

          {dispatchedVolunteer && (dispatchStatus === 'dispatching' || dispatchStatus === 'en_route') && (
            <>
              <Avatar className="mx-auto h-24 w-24 border-4 border-primary">
                {volunteerAvatar && <AvatarImage src={volunteerAvatar.imageUrl} alt={dispatchedVolunteer.name} data-ai-hint={volunteerAvatar.imageHint} />}
                <AvatarFallback>{dispatchedVolunteer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold text-primary mt-4">
                {dispatchStatus === 'dispatching' ? 'Volunteer Found!' : 'Help is on the way!'}
              </h1>
              <p className="text-2xl font-semibold mt-2">{dispatchedVolunteer.name}</p>
              <p className="text-muted-foreground">Is on their way. ETA: {dispatchedVolunteer.etaMinutes} minutes</p>

              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" size="lg"><Phone className="mr-2"/>Call</Button>
                <Button size="lg"><Navigation className="mr-2"/>Track</Button>
              </div>
              
               <Progress value={progress} className="w-full mt-6" />
            </>
          )}

          <Button variant="outline" className="mt-8" onClick={resetState}>
            I am Safe Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            aria-label="Activate Panic Button"
            className="rounded-full w-24 h-24 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl animate-pulse"
            style={{ animationIterationCount: 'infinite', animationDuration: '2s' }}
          >
            <div className="flex flex-col items-center justify-center">
                <Siren className="w-10 h-10" />
                <span className="font-bold text-lg">SOS</span>
            </div>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Panic Alert?</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately send your live location to your emergency contacts and search for a nearby community volunteer. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSOS} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Yes, I'm in Danger
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
