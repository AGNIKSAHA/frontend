

export interface AnalyticsItem {
  name: string;
  value: number;
}

export interface ClickTimeItem {
  time: string;
  count: number;
}

export interface AnalyticsResponse {
  devices?: AnalyticsItem[];
  browsers?: AnalyticsItem[];
  os?: AnalyticsItem[];
  countries?: AnalyticsItem[];
  clicks_over_time?: ClickTimeItem[];
}

export interface UrlDetails {
  id: string;
  original_url: string;
  short_code: string;
  click_count: number;
  expires_at: string;
}
