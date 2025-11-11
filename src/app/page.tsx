import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Map, Users, HeartHandshake } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'welcome-hero');

  return (
    <div className="flex flex-col gap-8">
      <Card className="relative overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-primary/80 to-primary/60 absolute inset-0"></div>
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Welcome hero image"
            fill
            className="object-cover object-center opacity-20 mix-blend-overlay"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground font-headline">
            Welcome to Samrakshni
          </h1>
          <p className="mt-2 text-lg text-primary-foreground/90 max-w-2xl">
            Your safety companion. Stay alert, connected, and empowered. The panic button is always ready when you need it.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Map</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Stay Informed</div>
            <p className="text-xs text-muted-foreground">
              View real-time incident reports and locate safe zones.
            </p>
            <Link href="/map" className="text-sm text-primary hover:underline mt-2 inline-block">View Map →</Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Watch</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Join the Effort</div>
            <p className="text-xs text-muted-foreground">
              Report incidents and see updates from trusted members.
            </p>
            <Link href="/community" className="text-sm text-primary hover:underline mt-2 inline-block">Visit Community →</Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Tips</CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Learn & Share</div>
            <p className="text-xs text-muted-foreground">
              Empower yourself and others with crucial safety knowledge.
            </p>
            <Link href="/safety-tips" className="text-sm text-primary hover:underline mt-2 inline-block">Read Tips →</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
