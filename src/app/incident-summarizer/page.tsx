import { PageTitle } from "@/components/page-title";
import { SummarizerForm } from "./summarizer-form";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function IncidentSummarizerPage() {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="AI Incident Summarizer" 
        icon={FileText}
        description="Use AI to summarize incident reports and identify potential patterns. This tool is intended for authorized personnel."
      />
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Summarize Incident Report</CardTitle>
          <CardDescription>Paste the incident report below to generate an AI-powered summary.</CardDescription>
        </CardHeader>
        <CardContent>
          <SummarizerForm />
        </CardContent>
      </Card>
    </div>
  );
}
