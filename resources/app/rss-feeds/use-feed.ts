import { RssFeedEntry, Subscription } from '@/rss-feeds/models.ts';
import { atom, useAtom } from 'jotai';

type Config = {
  subscriptions: Subscription[];
  selectedSubscription: Subscription | null;
  selected: RssFeedEntry['link'] | null;
}

const configAtom = atom<Config>({
  subscriptions: [],
  selectedSubscription: null,
  selected: null,
});

export function useFeed() {
  return useAtom(configAtom);
}
