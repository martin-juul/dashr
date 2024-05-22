import RssFeedViewer from '@/rss-feeds/rss-feed-viewer.tsx';
import { useEffect, useState } from 'react';
import { RssFeed } from '@/rss-feeds/models.ts';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import SubscriptionManager from '@/rss-feeds/subscription-manager/subscription-manager';
import { useFetch } from '@/hooks';
import { useFeed } from '@/rss-feeds/use-feed';

const RssFeedsPage = () => {
  const [feed, setFeed] = useState<RssFeed | null>(null);
  const [f] = useFeed();
  const feedFetch = useFetch<RssFeed>();

  useEffect(() => {
    if (f.selectedSubscription?.id) {
      feedFetch.fetch(`/api/rss/feed/${f.selectedSubscription.id}`);
    }
  }, [f.selectedSubscription?.id]);

  useEffect(() => {
    if (feedFetch.data) {
      setFeed(feedFetch.data)
    }
  }, [feedFetch]);

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <SubscriptionManager/>
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel>
          {feed && <RssFeedViewer feed={feed}/>}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default RssFeedsPage;
