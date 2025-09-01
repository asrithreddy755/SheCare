'use server';
/**
 * @fileOverview An AI-powered health tool recommendation agent.
 *
 * - getPersonalizedHealthToolRecommendation - A function that provides personalized suggestions for health resources and consultation types based on user history.
 * - PersonalizedHealthToolRecommendationInput - The input type for the getPersonalizedHealthToolRecommendation function.
 * - PersonalizedHealthToolRecommendationOutput - The return type for the getPersonalizedHealthToolRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthToolRecommendationInputSchema = z.object({
  userHistory: z
    .string()
    .describe('The user search history and questions for health-related information.'),
});
export type PersonalizedHealthToolRecommendationInput = z.infer<typeof PersonalizedHealthToolRecommendationInputSchema>;

const PersonalizedHealthToolRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'Personalized suggestions for possible resources and consultation types based on user history.'
    ),
});
export type PersonalizedHealthToolRecommendationOutput = z.infer<typeof PersonalizedHealthToolRecommendationOutputSchema>;

export async function getPersonalizedHealthToolRecommendation(
  input: PersonalizedHealthToolRecommendationInput
): Promise<PersonalizedHealthToolRecommendationOutput> {
  return personalizedHealthToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthToolRecommendationPrompt',
  input: {schema: PersonalizedHealthToolRecommendationInputSchema},
  output: {schema: PersonalizedHealthToolRecommendationOutputSchema},
  prompt: `You are an AI-powered chatbot designed to provide personalized health tool recommendations.\n
  Based on the user's history, provide suggestions for resources and consultation types that might be helpful.\n
  User History: {{{userHistory}}}\n  Recommendation:`
});

const personalizedHealthToolRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedHealthToolRecommendationFlow',
    inputSchema: PersonalizedHealthToolRecommendationInputSchema,
    outputSchema: PersonalizedHealthToolRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
