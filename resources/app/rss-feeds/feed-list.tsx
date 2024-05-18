import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { RssFeedEntry } from '@/rss-feeds/models.ts';
import { cn } from '@/lib/utils.ts';
import { useFeed } from '@/rss-feeds/use-feed.ts';

type FeedListProps = {
  items: RssFeedEntry[];
}
const FeedList = ({items}: FeedListProps) => {
  const [entry, setEntry] = useFeed();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.link}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              entry.selected === item.link && 'bg-muted',
            )}
            onClick={() => {
              setEntry({
                ...entry,
                selected: item.link,
              });
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div
                  className={cn(
                    'ml-auto text-xs',
                    entry.selected === item.link
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {item.createdAt?.toLocaleString()}
                </div>
              </div>
              <div className="text-xs font-medium">{item.title}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default FeedList;
