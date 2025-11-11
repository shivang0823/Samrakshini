import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { incidents, trustedContributors } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { formatDistanceToNow } from "date-fns";
import { UserCheck, MessageSquare, Star } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Community Watch</h2>
        <div className="flex items-center space-x-2">
          <Button>Report an Incident</Button>
        </div>
      </div>
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
          <TabsTrigger value="contributors">Trusted Contributors</TabsTrigger>
        </TabsList>
        <TabsContent value="incidents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {incidents.map((incident) => (
              <Card key={incident.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{incident.location.name}</span>
                    <Badge variant={incident.type === 'Harassment' || incident.type === 'Assault' ? 'destructive' : 'secondary'}>{incident.type}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Reported {formatDistanceToNow(new Date(incident.reportedAt), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="contributors" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Community Pillars</CardTitle>
                    <CardDescription>
                        These are our most active and trusted community members, verified for their contributions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {trustedContributors.map(contributor => {
                       const avatarImage = placeholderImages.find(p => p.id === contributor.avatar);
                       return (
                        <div key={contributor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={contributor.name} data-ai-hint={avatarImage.imageHint}/>}
                                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-primary">{contributor.name}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3"/> {contributor.contributions} contributions</span>
                                      <span className="flex items-center gap-1"><Star className="w-3 h-3"/> {contributor.reputation}% reputation</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant="outline" className="border-green-600 text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Verified
                            </Badge>
                        </div>
                       )
                   })}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
