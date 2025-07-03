export type GCSentiment = {
  sentiment: string;
  intensity: number;
  emoji: string;
  category: 'positive' | 'negative';
  reason: string;
  message: string;
  suggested_action: 'allow' | 'block';
};

export type GCAiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash';

export type GCSupportedModel = {
  title: string;
  name: GCAiModel;
};
export type GCConfig = {
  apiKey: string;
  model: GCAiModel;
  debug?: boolean;
};