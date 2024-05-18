import { ErrorBoundary } from 'react-error-boundary';
import axios from 'axios';
import { RssFeed } from '@/rss-feeds/models.ts';
import { useEffect, useState } from 'react';
import RssFeedViewer from '@/rss-feeds/rss-feed-viewer.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import './index.css';


const App = () => {
  const [feed, setFeed] = useState<RssFeed | null>(null);

  useEffect(() => {
    axios.get<RssFeed>('/api/rss')
      .then(data => setFeed(data.data));
  }, []);

  return (
    <ErrorBoundary fallback={<div>App error</div>}>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="elative flex min-h-screen flex-col">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>


          {feed && <RssFeedViewer feed={feed}/>}

        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
