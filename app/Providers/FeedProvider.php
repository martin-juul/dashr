<?php

namespace App\Providers;

use App\Services\Rss\GuzzleClient;
use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;
use Laminas\Feed\Reader\Reader;

class FeedProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Reader::setHttpClient(new GuzzleClient(new Client()));
    }
}
