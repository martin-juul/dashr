<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Rss\FeedService;

class RssController extends Controller
{
    public function __construct(private readonly FeedService $feedService)
    {
    }

    public function show()
    {
        $feed = $this->feedService->parseUrl('http://basalgangster.macgui.com/RetroMacComputing/The_Long_View/rss.xml');

        return response()->json($feed);
    }
}
