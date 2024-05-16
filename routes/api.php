<?php

use Illuminate\Support\Facades\Route;

Route::get('rss', 'App\Http\Controllers\Api\RssController@show')->name('api.rss.show');
