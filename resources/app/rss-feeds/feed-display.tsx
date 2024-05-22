import { useEffect, useState } from 'react';
import { RssFeedEntry } from '@/rss-feeds/models';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { proxyImgUrls } from '@/lib';

type Props = {
  entry: RssFeedEntry | null
}
const FeedDisplay = ({entry}: Props) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let htmlstr = entry?.content ?? entry?.description ?? '';
    htmlstr = proxyImgUrls(htmlstr);


    setHtml(htmlstr);
  }, [entry?.content, entry?.description])

  return (
    <div className="flex h-full flex-col">
      {entry ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                <div className="font-semibold">{entry.title}</div>
              </div>
            </div>
            {entry.createdAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(entry.createdAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            <div dangerouslySetInnerHTML={{__html: html}}></div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No story
        </div>
      )}
    </div>
  )
}

export default FeedDisplay;
