<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

/**
 * This service proxies all pictures, or that's what it's meant to.
 * Currently, it doesn't verify the actual type of what it receives, so it's considered unsafe.
 * It is however needed since not all RSS feeds serve https pictures.
 */
class ImageProxy
{
    public function __construct(private readonly Client $client)
    {
    }

    public function proxy(string $url)
    {
        if ($this->fileExists($url)) {
            return $this->serveFile($url);
        }

        $this->fetchUrl($url);

        return $this->serveFile($url);
    }

    private function fileExists(string $url): bool
    {
        return $this->getDisk()->exists($this->makePath($url));
    }

    private function getFile(string $url)
    {
        return $this->getDisk()->get($this->makePath($url));
    }

    private function makeHash(string $url): string
    {
        return hash('sha256', $url);
    }

    private function makePath(string $url)
    {
        return Arr::join(['imgproxy', $this->makeHash($url)], '/');
    }

    private function fetchUrl(string $url)
    {
        $res = $this->client->get($url);
        $body = $res->getBody()->getContents();
        $path = $this->makePath($url);

        $this->getDisk()->put($path, $body);
    }

    /**
     * @return array{content: mixed, content_length: int, mime_type: false|string}
     */
    private function serveFile(string $url): array
    {
        $content = $this->getFile($url);
        // here we're stripping null bytes
        $content = str_replace('\0', '', $content);

        // TODO: due to php being a little weird, we have to write the contents to a temporary file.
        // otherwise we can't read the mime type later on.
        // now we could store this in the database, so let's keep a reference for an optimisation here.
        $tempFile = tempnam(sys_get_temp_dir(), 'imgproxy');
        file_put_contents($tempFile, $content);

        $mimeType = mime_content_type($tempFile);

        unlink($tempFile);

        return [
            'content'        => $content,
            'content_length' => strlen($content),
            'mime_type'      => $mimeType,
        ];
    }

    private function getDisk()
    {
        return Storage::disk('public');
    }
}
