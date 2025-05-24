"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, AlertCircle, CheckCircle } from "lucide-react";
import { summarizeIncidentAction, SummarizeActionResult } from "./actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Summarizing..." : "Generate Summary"}
    </Button>
  );
}

export function SummarizerForm() {
  const initialState: SummarizeActionResult | undefined = undefined;
  const [state, formAction] = useFormState(summarizeIncidentAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.summary) {
      toast({
        title: "Summary Generated",
        description: "The incident report has been summarized successfully.",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800 dark:bg-green-800 dark:text-green-100 dark:border-green-700",
        action: <CheckCircle className="text-green-600 dark:text-green-400" />
      });
      formRef.current?.reset(); // Reset form after successful summary
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} ref={formRef} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="incidentReport" className="text-base">Incident Report Text</Label>
        <Textarea
          id="incidentReport"
          name="incidentReport"
          placeholder="Paste the full incident report here..."
          rows={10}
          className="resize-y min-h-[150px] shadow-sm"
          aria-describedby="incidentReport-error"
        />
        {state?.fieldErrors?.incidentReport && (
           <p id="incidentReport-error" className="text-sm text-destructive">
             {state.fieldErrors.incidentReport.join(", ")}
           </p>
        )}
      </div>
      
      <SubmitButton />

      {state?.error && !state.fieldErrors && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.summary && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Terminal className="mr-2 h-5 w-5 text-primary" />
              AI Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm leading-relaxed font-mono">
              {state.summary}
            </pre>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
