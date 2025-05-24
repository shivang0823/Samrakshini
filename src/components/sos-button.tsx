"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SOSButton() {
  const { toast } = useToast();

  const handleSOS = () => {
    // In a real app, this would trigger Firebase Cloud Functions, share location, etc.
    toast({
      title: "SOS Activated!",
      description: "Emergency alert sent. Help is on the way.",
      variant: "destructive",
    });
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className="w-full h-20 text-xl font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg"
      onClick={handleSOS}
      aria-label="Activate SOS Alert"
    >
      <AlertTriangle className="mr-3 h-8 w-8" />
      ACTIVATE SOS
    </Button>
  );
}
