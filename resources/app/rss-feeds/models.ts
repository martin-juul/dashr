import { PaginatedResponse } from '@/lib/paginated-response.ts';

export interface RssFeedEntry {
  title: string;
  createdAt: Date | null;
  description: string;
  content: string;
  link: string;
}

export interface RssFeed {
  title: string;
  link: string;
  entries: RssFeedEntry[];
}

export interface Subscription {
  id: number;
  title: string;
  url: string;
  logo: string | null;
  created: Date;
  updatedAt: Date;
}

export type SubscriptionResponse = PaginatedResponse<Subscription>;
