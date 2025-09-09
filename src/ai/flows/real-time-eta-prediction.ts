// src/ai/flows/real-time-eta-prediction.ts
'use server';

/**
 * @fileOverview A real-time ETA prediction AI agent.
 *
 * - predictRealTimeETA - A function that handles the real-time ETA prediction process.
 * - RealTimeETAPredictionInput - The input type for the predictRealTimeETA function.
 * - RealTimeETAPredictionOutput - The return type for the predictRealTimeETA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimeETAPredictionInputSchema = z.object({
  busLocation: z
    .object({
      latitude: z.number().describe('The latitude of the bus.'),
      longitude: z.number().describe('The longitude of the bus.'),
      timestamp: z.number().describe('The timestamp of the bus location.'),
    })
    .describe('The current location of the bus.'),
  studentStop: z
    .object({
      latitude: z.number().describe('The latitude of the student stop.'),
      longitude: z.number().describe('The longitude of the student stop.'),
    })
    .describe('The location of the student stop.'),
  routeData: z.string().describe('The route data including distance to the stop.'),
  historicalTrafficData: z
    .string()
    .describe('Historical traffic data for the route and time of day.'),
});
export type RealTimeETAPredictionInput = z.infer<typeof RealTimeETAPredictionInputSchema>;

const RealTimeETAPredictionOutputSchema = z.object({
  estimatedArrivalTime: z.string().describe('The estimated time of arrival at the student stop.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the ETA prediction (0 to 1).'),
  explanation: z.string().describe('Explanation of factors affecting ETA.'),
});
export type RealTimeETAPredictionOutput = z.infer<typeof RealTimeETAPredictionOutputSchema>;

export async function predictRealTimeETA(
  input: RealTimeETAPredictionInput
): Promise<RealTimeETAPredictionOutput> {
  return realTimeETAPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeETAPredictionPrompt',
  input: {schema: RealTimeETAPredictionInputSchema},
  output: {schema: RealTimeETAPredictionOutputSchema},
  prompt: `You are a real-time ETA prediction expert. You will receive the current
  bus location, the student's stop location, route data, and historical traffic
  data. Use this information to estimate the arrival time at the student's stop.

  Bus Location: Latitude: {{{busLocation.latitude}}}, Longitude:
  {{{busLocation.longitude}}}, Timestamp: {{{busLocation.timestamp}}}
  Student Stop: Latitude: {{{studentStop.latitude}}}, Longitude:
  {{{studentStop.longitude}}}
  Route Data: {{{routeData}}}
  Historical Traffic Data: {{{historicalTrafficData}}}

  Provide the estimated arrival time, a confidence level (0 to 1), and an
  explanation of the factors affecting the ETA.

  Ensure the estimatedArrivalTime is in ISO 8601 format.
  `,
});

const realTimeETAPredictionFlow = ai.defineFlow(
  {
    name: 'realTimeETAPredictionFlow',
    inputSchema: RealTimeETAPredictionInputSchema,
    outputSchema: RealTimeETAPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
