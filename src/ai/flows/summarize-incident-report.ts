// Summarize incidents reports using AI to highlight patterns for local authorities.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIncidentReportInputSchema = z.object({
  incidentReport: z.string().describe('The incident report to summarize.'),
});
export type SummarizeIncidentReportInput = z.infer<typeof SummarizeIncidentReportInputSchema>;

const SummarizeIncidentReportOutputSchema = z.object({
  summary: z.string().describe('The summary of the incident report.'),
});
export type SummarizeIncidentReportOutput = z.infer<typeof SummarizeIncidentReportOutputSchema>;

export async function summarizeIncidentReport(input: SummarizeIncidentReportInput): Promise<SummarizeIncidentReportOutput> {
  return summarizeIncidentReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIncidentReportPrompt',
  input: {schema: SummarizeIncidentReportInputSchema},
  output: {schema: SummarizeIncidentReportOutputSchema},
  prompt: `You are an expert in analyzing incident reports and summarizing them to identify key patterns and trends.

  Please summarize the following incident report, highlighting any potential patterns or trends:

  {{{incidentReport}}}`,
});

const summarizeIncidentReportFlow = ai.defineFlow(
  {
    name: 'summarizeIncidentReportFlow',
    inputSchema: SummarizeIncidentReportInputSchema,
    outputSchema: SummarizeIncidentReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
