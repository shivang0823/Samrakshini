"use server";

import { summarizeIncidentReport, SummarizeIncidentReportInput } from '@/ai/flows/summarize-incident-report';
import { z } from 'zod';

const SummarizeActionInputSchema = z.object({
  incidentReport: z.string().min(1, "Incident report cannot be empty."),
});

export interface SummarizeActionResult {
  summary?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function summarizeIncidentAction(
  prevState: SummarizeActionResult | undefined,
  formData: FormData
): Promise<SummarizeActionResult> {
  const rawFormData = {
    incidentReport: formData.get('incidentReport') as string,
  };

  const validatedFields = SummarizeActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Invalid input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const input: SummarizeIncidentReportInput = {
      incidentReport: validatedFields.data.incidentReport,
    };
    const result = await summarizeIncidentReport(input);
    if (result.summary) {
      return { summary: result.summary };
    } else {
      return { error: "Failed to generate summary." };
    }
  } catch (e) {
    console.error("Error in summarizeIncidentAction:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `AI Summarization failed: ${errorMessage}` };
  }
}
