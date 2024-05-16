<?php

namespace App\Services;

use Illuminate\Support\Facades\{Http, Storage};

class AssetDownloader
{
    public function downloadIcon(string $url, string $name)
    {
        $res = Http::get($url);

        throw_if(!$res->ok());

        $content = $res->body();
        $mime = iconv_get_encoding($content);
        $ext = mime2ext($mime);
        $filename = hash('sha256', $url . $name) . $ext;

        Storage::disk('public')->put('icons' . DIRECTORY_SEPARATOR . $filename, $content);

        return $filename;
    }
}
