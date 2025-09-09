'use server';

/**
 * @fileOverview Route summarization AI agent.
 *
 * - summarizeRoute - A function that summarizes the route.
 * - SummarizeRouteInput - The input type for the summarizeRoute function.
 * - SummarizeRouteOutput - The return type for the summarizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRouteInputSchema = z.object({
  routeName: z.string().describe('The name of the bus route.'),
  keyStops: z.string().describe('Key stops along the route.'),
  pointsOfInterest: z.string().describe('Points of interest along the route.'),
});
export type SummarizeRouteInput = z.infer<typeof SummarizeRouteInputSchema>;

const SummarizeRouteOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the bus route.'),
});
export type SummarizeRouteOutput = z.infer<typeof SummarizeRouteOutputSchema>;

export async function summarizeRoute(input: SummarizeRouteInput): Promise<SummarizeRouteOutput> {
  return summarizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRoutePrompt',
  input: {schema: SummarizeRouteInputSchema},
  output: {schema: SummarizeRouteOutputSchema},
  prompt: `You are a helpful assistant that provides summaries of bus routes.

  Summarize the following bus route information for new students:

  Route Name: {{{routeName}}}
  Key Stops: {{{keyStops}}}
  Points of Interest: {{{pointsOfInterest}}}
  `,
});

const summarizeRouteFlow = ai.defineFlow(
  {
    name: 'summarizeRouteFlow',
    inputSchema: SummarizeRouteInputSchema,
    outputSchema: SummarizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
