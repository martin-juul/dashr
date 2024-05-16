<?php

namespace App\Services\Rss;

use Illuminate\Support\Carbon;
use Laminas\Feed\Reader\Reader;

class FeedService
{
    public function parseUrl(string $url)
    {
        $feed = Reader::import($url);
        $data = [];
        $data['title'] = $feed->getTitle();
        $data['link'] = $feed->getLink();

        foreach ($feed as $entry) {
            $createdAt = $entry->getDateCreated();
            if ($createdAt) {
                $createdAt = Carbon::make($createdAt)->jsonSerialize();
            }

            $data['entries'][] = [
                'title'       => $entry->getTitle(),
                'createdAt'   => $createdAt,
                'link'        => $entry->getLink(),
                'description' => $entry->getDescription(),
                'content'     => $entry->getContent(),
            ];
        }

        return $data;
    }
}
