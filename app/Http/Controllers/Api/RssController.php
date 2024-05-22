<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubscriptionCreateUpdateRequest;
use App\Http\Resources\RssFeedResource;
use App\Models\RssFeed;
use App\Services\Rss\FeedService;
use Illuminate\Http\{Request, Response};

class RssController extends Controller
{
    public function __construct(private readonly FeedService $feedService)
    {
    }

    public function showFeed(int $id)
    {
        abort_if(!$id, Response::HTTP_BAD_REQUEST, 'You must supply an id');

        $model = RssFeed::whereId($id)->firstOrFail();
        $feed = $this->feedService->parseUrl($model->url);

        return response()->json($feed);
    }

    public function getSubscriptions()
    {
        return RssFeedResource::collection(RssFeed::paginate());
    }

    public function create(SubscriptionCreateUpdateRequest $request)
    {
        $data = $request->validated();

        $model = new RssFeed($data);
        $model->saveOrFail();

        return new RssFeedResource($model);
    }

    public function show(string $id, Request $request)
    {
        abort_if(!$id, Response::HTTP_BAD_REQUEST, 'You must supply an id');

        $model = RssFeed::whereId($id)->firstOrFail();

        RssFeedResource::withoutWrapping();

        return new RssFeedResource($model);
    }

    public function update(int $id, SubscriptionCreateUpdateRequest $request)
    {
        $model = RssFeed::whereId($id)->firstOrFail();

        $model->update($request->validated());

        RssFeedResource::withoutWrapping();

        return new RssFeedResource($model);
    }

    public function delete(int $id)
    {
        RssFeed::whereId($id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
