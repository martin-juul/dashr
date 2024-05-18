<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ImageProxy;
use Illuminate\Http\{Request, Response};

class ImageProxyController extends Controller
{
    public function __construct(private readonly ImageProxy $imageProxy)
    {
    }

    public function get(Request $request)
    {
        $image = $this->imageProxy->proxy($request->query('url'));

        $headers = [
            'Content-Type'   => $image['mime_type'],
            'Content-Length' => $image['content_length'],
        ];

        return response($image['content'], Response::HTTP_OK, $headers);
    }
}
