import { PageTitle } from "@/components/page-title";
import { ReportUnsafeAreaForm } from "./report-unsafe-area-form";
import { MessageSquareWarning } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportUnsafeAreaPage() {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Report Unsafe Area" 
        icon={MessageSquareWarning}
        description="Help your community by reporting areas you feel are unsafe. Your report can be anonymous." 
      />
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>New Unsafe Area Report</CardTitle>
          <CardDescription>Please provide details about the location and the reason you consider it unsafe.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportUnsafeAreaForm />
        </CardContent>
      </Card>
    </div>
  );
}
