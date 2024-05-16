<?php

namespace App\Services\Rss;

use GuzzleHttp\Exception\GuzzleException;
use Laminas\Feed\Reader\Http\ClientInterface;
use Laminas\Feed\Reader\Http\Psr7ResponseDecorator;

class GuzzleClient implements ClientInterface
{
    public function __construct(private \GuzzleHttp\ClientInterface $client)
    {
    }

    /**
     * @throws GuzzleException
     */
    public function get($uri)
    {
        return new Psr7ResponseDecorator(
            $this->client->request('GET', $uri),
        );
    }
}
