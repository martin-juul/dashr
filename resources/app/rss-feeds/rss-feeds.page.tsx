import RssFeedViewer from '@/rss-feeds/rss-feed-viewer.tsx';
import { useEffect, useState } from 'react';
import { RssFeed } from '@/rss-feeds/models.ts';
import axios from 'axios';

const RssFeedsPage = () => {
  const [feed, setFeed] = useState<RssFeed | null>(null);

  useEffect(() => {
    axios.get<RssFeed>('/api/rss')
      .then(data => setFeed(data.data));
  }, []);

  return (
    <>
      {feed && <RssFeedViewer feed={feed}/>}
    </>
  )
}

export default RssFeedsPage;
