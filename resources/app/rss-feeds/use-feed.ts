import { RssFeedEntry } from '@/rss-feeds/models.ts';
import { atom, useAtom } from 'jotai';

type Config = {
  selected: RssFeedEntry['link'] | null
}

const configAtom = atom<Config>({
  selected: null,
});

export function useFeed() {
  return useAtom(configAtom);
}
