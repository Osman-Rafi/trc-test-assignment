<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateHtmlSnippetRequest extends FormRequest
{


    public function rules()
    {
        return [
            'type' => 'required',
            'title' => 'required',
            'description' => 'required'
        ];
    }
}
