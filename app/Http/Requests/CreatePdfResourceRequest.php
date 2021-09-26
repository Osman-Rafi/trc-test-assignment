<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePdfResourceRequest extends FormRequest
{


    public function rules()
    {
        return [
            'type' => 'required',
            'title' => 'required',
            'file' => 'required | mimes:pdf'
        ];
    }
}
