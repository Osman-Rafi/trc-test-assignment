<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePdfResourceRequest extends FormRequest
{

    public function rules()
    {
        return [
            'type' => 'required | in:pdf',
            'title' => 'required',
            'file' => 'required | mimes:pdf'
        ];
    }
}
