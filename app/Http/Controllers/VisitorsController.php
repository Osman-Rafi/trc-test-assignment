<?php

namespace App\Http\Controllers;

use App\Resources;

class VisitorsController extends Controller
{
    public function fetchResources()
    {
        $resources = Resources::select('id', 'type', 'title', 'file', 'description', 'snippet', 'url', 'new_tab', 'created_at')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'resources' => $resources
        ]);
    }
}
