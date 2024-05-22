import { usePagination } from '@/hooks';
import { Subscription } from '@/rss-feeds/models.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useFeed } from '@/rss-feeds/use-feed.ts';

const Subscriptions = () => {
  const {
    data,
    isLoading,
    error,
  } = usePagination<Subscription>({initialUrl: '/api/rss/subscriptions'});
  const [feed, setFeed] = useFeed();

  const setCurrentSubscription = (subscription: Subscription) => {
    setFeed({
      ...feed,
      selectedSubscription: subscription,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <ScrollArea className="h-72 w-48 rounded-md-border">
      <div className="p-4">
        {data?.data.map(subscription => (
          <div key={subscription.id} onClick={() => setCurrentSubscription(subscription)}>
            <div className="cursor-pointer">{subscription.title}</div>

            <Separator className="my-2"/>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Subscriptions;
