<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePdfResourceRequest;
use App\Resources;

class ManagementController extends Controller
{
    public function createPdfResource(CreatePdfResourceRequest $request)
    {
        $resources = new Resources();

        // saving file to storage
        $filePath = $request->file('file')->store('files', 'public');

        // saving request data to DB
        $resources->type = $request->type;
        $resources->title = $request->title;
        $resources->file = $filePath;


        $resources->save();

        return response(['message' => 'Resource created successfully'], 201);
    }

    public function fetchResources()
    {
        $resources = Resources::select('id', 'type', 'title', 'file', 'description', 'new_tab', 'created_at')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'resources' => $resources
        ]);
    }
}
