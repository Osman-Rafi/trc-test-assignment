<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| PDF Resource
|--------------------------------------------------------------------------
*/
Route::post('/create-pdf-resource', 'ManagementController@createPdfResource');
Route::post('/update-pdf-resource/{resource}', 'ManagementController@updatePdfResource');
Route::get('/download-pdf-resource/{filePath}', 'VisitorsController@downloadPdfResource');
/*
|--------------------------------------------------------------------------
| HTML Resource
|--------------------------------------------------------------------------
*/
Route::post('/create-html-snippet', 'ManagementController@createHtmlSnippet');
Route::put('/update-html-snippet/{resource}', 'ManagementController@updateHtmlSnippet');
/*
|--------------------------------------------------------------------------
| Link Resource
|--------------------------------------------------------------------------
*/
Route::post('/create-link-resource', 'ManagementController@createLinkResource');
Route::put('/update-link-resource/{resource}', 'ManagementController@updateLinkResource');


/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
*/
Route::get('/fetch-resources', 'VisitorsController@fetchResources');
Route::delete('/delete-resource/{resource}', 'ManagementController@destroyResource');
