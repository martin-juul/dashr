<?php

use Illuminate\Support\Facades\Route;

Route::view('/{all?}', 'app')
    ->name('webui')
    ->where(['all' => '.*']);
