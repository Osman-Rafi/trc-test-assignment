<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHtmlSnippetRequest extends FormRequest
{
    public function rules()
    {
        return [
            'type' => 'required | in:html',
            'title' => 'required',
            'description' => 'required'
        ];
    }
}
