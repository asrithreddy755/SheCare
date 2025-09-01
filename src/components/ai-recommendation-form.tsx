'use client';

import {useState} from 'react';
import {
  getHealthToolRecommendation,
  type HealthToolRecommendationOutput,
} from '@/ai/flows/ai-health-tool-recommendation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Loader2, Sparkles} from 'lucide-react';

export function AiRecommendationForm() {
  const [history, setHistory] = useState('');
  const [recommendation, setRecommendation] = useState<HealthToolRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getHealthToolRecommendation({userHistory: history});
      setRecommendation(result);
    } catch (err) {
      setError('An error occurred while fetching recommendations. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Health Assistant
        </CardTitle>
        <CardDescription>
          Describe your symptoms or health questions below. Our AI assistant will provide anonymous suggestions for resources and consultation types that might be helpful. This is not medical advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="e.g., I've been feeling tired for the last two weeks and have occasional headaches..."
            className="min-h-[120px]"
            required
          />
          <Button type="submit" disabled={isLoading || !history.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              'Get Recommendation'
            )}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {recommendation && (
          <Card className="mt-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Personalized Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{recommendation.recommendation}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
