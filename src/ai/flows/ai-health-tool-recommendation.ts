'use server';
/**
 * @fileOverview An AI-powered health tool recommendation agent.
 *
 * - getHealthToolRecommendation - A function that provides personalized suggestions for health resources and consultation types based on user history.
 * - HealthToolRecommendationInput - The input type for the getHealthToolRecommendation function.
 * - HealthToolRecommendationOutput - The return type for the getHealthToolRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthToolRecommendationInputSchema = z.object({
  userHistory: z
    .string()
    .describe('The user search history and questions for health-related information.'),
});
export type HealthToolRecommendationInput = z.infer<typeof HealthToolRecommendationInputSchema>;

const HealthToolRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'Personalized suggestions for possible resources and consultation types based on user history.'
    ),
});
export type HealthToolRecommendationOutput = z.infer<typeof HealthToolRecommendationOutputSchema>;

export async function getHealthToolRecommendation(
  input: HealthToolRecommendationInput
): Promise<HealthToolRecommendationOutput> {
  return healthToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthToolRecommendationPrompt',
  input: {schema: HealthToolRecommendationInputSchema},
  output: {schema: HealthToolRecommendationOutputSchema},
  prompt: `You are an AI-powered chatbot designed to provide personalized health tool recommendations.

  Based on the user's history, provide suggestions for resources and consultation types that might be helpful.

  User History: {{{userHistory}}}
  Recommendation:`, // The LLM should reply with the recommendation.
});

const healthToolRecommendationFlow = ai.defineFlow(
  {
    name: 'healthToolRecommendationFlow',
    inputSchema: HealthToolRecommendationInputSchema,
    outputSchema: HealthToolRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
