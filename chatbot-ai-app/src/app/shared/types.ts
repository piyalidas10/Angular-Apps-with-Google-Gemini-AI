export type GCAiModel = 'gemini-2.5-pro' | 'gemini-2.5-flash';

export type GCSupportedModel = {
  title: string;
  name: GCAiModel;
};
export type GCConfig = {
  apiKey: string;
  model: GCAiModel;
  debug?: boolean;
};