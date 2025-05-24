import { PageTitle } from "@/components/page-title";
import { SOSButton } from "@/components/sos-button";
import { LocationDisplay } from "@/components/location-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, MessageSquareWarning, UserPlus, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageTitle title="Dashboard" icon={LayoutDashboard} description="Welcome to Suraksha Kavach. Your safety is our priority." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SOSButton />
          <LocationDisplay />
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Safety Tools</CardTitle>
              <CardDescription>Access other safety features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/report-unsafe-area" passHref legacyBehavior>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquareWarning className="mr-2 h-5 w-5 text-primary" /> Report Unsafe Area
                </Button>
              </Link>
              <Link href="/incident-summarizer" passHref legacyBehavior>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-5 w-5 text-primary" /> AI Incident Summarizer
                </Button>
              </Link>
              <Link href="/emergency-contacts" passHref legacyBehavior>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="mr-2 h-5 w-5 text-primary" /> Emergency Contacts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">News & Alerts</CardTitle>
          <CardDescription>Stay informed about safety in your community (coming soon).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Real-time safety alerts and news updates will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
