<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMatriculaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fkOrganizacionRUCE' => [
                'required',
                'exists:OrganizacionRUCE,id'
            ],
            'periodoLectivo' => [
                'required',
                'integer',
            ],
            'matricula' => [
                'required',
                'integer',
            ],
            'idUsuarioAlta' => [
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkOrganizacionRUCE.exist' => 'Id de Organizacion no existe en la tabla OrganizacionRUCE.',
        ];
    }
}