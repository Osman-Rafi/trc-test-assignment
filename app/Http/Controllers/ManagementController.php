<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateHtmlSnippetRequest;
use App\Http\Requests\CreateLinkResourceRequest;
use App\Http\Requests\CreatePdfResourceRequest;
use App\Http\Requests\UpdateHtmlSnippetRequest;
use App\Http\Requests\UpdateLinkResourceRequest;
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

        return response(['message' => 'Resource updated successfully', 'resource' => $resource], 201);
    }

    public function fetchResources()
    {
        $resources = Resources::select('id', 'type', 'title', 'file', 'description', 'snippet', 'url', 'new_tab', 'created_at')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'resources' => $resources
        ]);
    }

    public function createHtmlSnippet(CreateHtmlSnippetRequest $request)
    {
        $resource = new Resources();

        $resource->type = "html";
        $resource->title = $request->title;
        $resource->description = $request->description;
        $resource->snippet = $request->snippet;

        $resource->save();

        return response(['message' => 'Resource created successfully', 'resource' => $resource], 201);
    }

    public function updatePdfResource(UpdatePdfResourceRequest $request, Resources $resource)
    {
        $resource->type = $request->type;
        $resource->title = $request->title;

        $resource->file = $request->file('file')->store('files', 'public');

        $resource->save();

        return response(['message' => 'Resource updated successfully', 'resource' => $resource]);
    }

    public function destroyResource(Resources $resource)
    {
        $resource->delete();
        return response(['message' => 'Resource deleted successfully']);
    }

    public function updateHtmlSnippet(UpdateHtmlSnippetRequest $request, Resources $resource)
    {
        $resource->type = $request->type;
        $resource->title = $request->title;
        $resource->description = $request->description;
        $resource->snippet = $request->snippet;

        $resource->save();

        return response(['message' => 'Resource updated successfully', 'resource' => $resource]);
    }

    public function createLinkResource(CreateLinkResourceRequest $request)
    {
        $resource = new Resources();

        $resource->type = $request->type;
        $resource->title = $request->title;
        $resource->url = $request->url;
        $resource->new_tab = $request->newTab;

        $resource->save();

        return response(['message' => 'Resource created successfully', 'resource' => $resource], 201);
    }

    public function updateLinkResource(UpdateLinkResourceRequest $request, Resources $resource)
    {
        $resource->type = $request->type;
        $resource->title = $request->title;
        $resource->url = $request->url;
        $resource->new_tab = $request->newTab;

        $resource->save();

        return response(['message' => 'Resource updated successfully', 'resource' => $resource]);
    }
}
