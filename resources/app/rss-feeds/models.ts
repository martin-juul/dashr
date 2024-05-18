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
