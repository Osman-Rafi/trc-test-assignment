<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/fetch-resources', 'ManagementController@fetchResources');
Route::post('/create-pdf-resource', 'ManagementController@createPdfResource');
Route::post('/create-html-snippet', 'ManagementController@createHtmlSnippet');
Route::post('/update-pdf-resource/{resource}', 'ManagementController@updatePdfResource');
Route::delete('/delete-resource/{resource}', 'ManagementController@destroyResource');
