<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLinkResourceRequest extends FormRequest
{

    public function rules()
    {
        return [
            'type' => 'required | in:link',
            'url' => 'required'
        ];
    }
}
