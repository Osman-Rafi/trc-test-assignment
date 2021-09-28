<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateHtmlSnippetRequest;
use App\Http\Requests\CreatePdfResourceRequest;
use App\Http\Requests\UpdatePdfResourceRequest;
use App\Resources;

class ManagementController extends Controller
{
    public function createPdfResource(CreatePdfResourceRequest $request)
    {
        $resource = new Resources();

        // saving file to storage
        $filePath = $request->file('file')->store('files', 'public');

        // saving request data to DB
        $resource->type = $request->type;
        $resource->title = $request->title;
        $resource->file = $filePath;


        $resource->save();

        return response(['message' => 'Resource created successfully'], 201);
    }

    public function fetchResources()
    {
        $resources = Resources::select('id', 'type', 'title', 'file', 'description', 'new_tab', 'created_at')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'resources' => $resources
        ]);
    }

    public function createHtmlSnippet(CreateHtmlSnippetRequest $request)
    {
        $resources = new Resources();

        $resources->type = "html";
        $resources->title = $request->title;
        $resources->description = $request->description;
        $resources->snippet = $request->snippet;

        $resources->save();

        return response(['message' => 'Resource created successfully'], 201);
    }

    public function updatePdfResource(Resources $resource, UpdatePdfResourceRequest $request)
    {
        $filePath = $request->file('file')->store('files', 'public');

        // saving request data to DB
        $resource->type = $request->type;
        $resource->title = $request->title;
        $resource->file = $filePath;


        $resource->save();

        return response(['message' => 'Resource updated successfully'], 201);
    }
}
