"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LocationDisplay() {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For privacy, we won't display actual coordinates.
          // In a real app, you'd use these coordinates with a mapping service.
          setLocation("Precise location acquired.");
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Unable to retrieve location.");
          setLoading(false);
          toast({
            title: "Location Error",
            description: "Could not retrieve your current location. Please check your browser settings.",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [toast]);

  const handleShareLocation = () => {
    if (location && location !== "Precise location acquired.") {
       toast({
        title: "Location Not Available",
        description: "Cannot share location as it's not available or an error occurred.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would share the location with emergency contacts.
    toast({
      title: "Location Shared",
      description: "Your current location has been shared with emergency contacts.",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Current Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Fetching location...</p>
        ) : (
          <p className="text-foreground font-medium">{location}</p>
        )}
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={handleShareLocation}
          disabled={loading || !location || location === "Unable to retrieve location." || location === "Geolocation is not supported by this browser."}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Location with Contacts
        </Button>
      </CardContent>
    </Card>
  );
}
