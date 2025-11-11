'use client';

import { useState } from 'react';
import { Siren, ShieldAlert } from 'lucide-react';
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
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export function PanicButton() {
  const [sosActivated, setSosActivated] = useState(false);
  const mapImage = placeholderImages.find(p => p.id === "map-view");

  const handleSOS = () => {
    // In a real app, this would trigger API calls
    console.log("SOS Activated!");
    setSosActivated(true);
  };
  
  if (sosActivated) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md w-full bg-card rounded-xl shadow-2xl p-8 border">
          <ShieldAlert className="mx-auto h-20 w-20 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold text-primary mt-4 font-headline">Help is on the way!</h1>
          <p className="text-muted-foreground mt-2">Your location has been shared with your emergency contacts and local authorities.</p>
          <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden border">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt="Map view showing user location"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
          </div>
          <Button variant="outline" className="mt-8" onClick={() => setSosActivated(false)}>
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
              This will immediately send your live location to your emergency contacts, local authorities, and nearby community members. Are you sure you want to proceed?
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
