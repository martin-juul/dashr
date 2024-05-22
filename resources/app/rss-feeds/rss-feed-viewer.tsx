import { RssFeed } from '@/rss-feeds/models.ts';
import FeedList from '@/rss-feeds/feed-list.tsx';
import FeedDisplay from '@/rss-feeds/feed-display.tsx';
import { useFeed } from '@/rss-feeds/use-feed.ts';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx';

type Props = {
  feed: RssFeed;
}
const RssFeedViewer = ({feed}: Props) => {
  const [entry] = useFeed();

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
      >
        <ResizablePanel>
          <FeedList items={feed.entries}/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={80}>
          <FeedDisplay entry={feed.entries.find((item) => item.link === entry.selected) || null}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default RssFeedViewer;
