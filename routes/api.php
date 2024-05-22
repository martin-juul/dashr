<?php

use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'rss'], function () {
    Route::get('feed/{id}', 'App\Http\Controllers\Api\RssController@showFeed')->name('api.rss.show-feed');

    Route::get('subscriptions', 'App\Http\Controllers\Api\RssController@getSubscriptions')->name('api.rss.get-subscriptions');
    Route::post('subscriptions', 'App\Http\Controllers\Api\RssController@create')->name('api.rss.create-subscription');
    Route::get('subscriptions/{id}', 'App\Http\Controllers\Api\RssController@show')->name('api.rss.show-subscription');
    Route::patch('subscriptions/{id}', 'App\Http\Controllers\Api\RssController@update')->name('api.rss.update-subscription');
    Route::delete('subscriptions/{id}', 'App\Http\Controllers\Api\RssController@delete')->name('api.rss.delete-subscription');

});

Route::get('imageproxy', 'App\Http\Controllers\Api\ImageProxyController@get')->name('api.image-proxy.get');
