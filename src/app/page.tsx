'use client';
import Link from 'next/link';
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
import { Map, Users, HeartHandshake, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const handleSOS = () => {
    // In a real app, this would trigger API calls
    // For now, it will just show the alert dialog functionality from the panic button
    console.log("SOS Activated from Home Page!");
    // You can re-use the logic from PanicButton's `handleSOS` if needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      
      <h1 className="text-4xl font-bold text-primary">Samrakshni</h1>

      <p className="mt-2 text-lg text-muted-foreground max-w-md">
        Your safety companion. Tap the SOS button in an emergency.
      </p>

      <div className="my-12">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              aria-label="Activate Panic Button"
              className="rounded-full w-48 h-48 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl animate-pulse"
              style={{ animationIterationCount: 'infinite', animationDuration: '2s' }}
            >
              <div className="text-5xl font-bold">SOS</div>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/map" passHref>
          <Button variant="secondary" className="w-28 h-28 flex flex-col gap-2">
            <Map className="w-8 h-8" />
            <span>Safety Map</span>
          </Button>
        </Link>
        <Link href="/community" passHref>
          <Button variant="secondary" className="w-28 h-28 flex flex-col gap-2">
            <Users className="w-8 h-8" />
            <span>Community</span>
          </Button>
        </Link>
        <Link href="/safety-tips" passHref>
          <Button variant="secondary" className="w-28 h-28 flex flex-col gap-2">
            <HeartHandshake className="w-8 h-8" />
            <span>Safety Tips</span>
          </Button>
        </Link>
        <Link href="/settings" passHref>
          <Button variant="secondary" className="w-28 h-28 flex flex-col gap-2">
            <Phone className="w-8 h-8" />
            <span>Emergency Contacts</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
