<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUsuarioRUCERequest extends FormRequest
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
            'fkPersonaRUCE' => [
                'required',
                'exists:PersonaRUCE,id'
            ],
            'password' => [
                'required',
                'string'
            ],
            'username' => [
                'required',
                'string'
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer'
            ],
            'administrador' => [
                'required',
                'boolean'
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkPersonaRUCE.exist' => 'Id de Persona no existe en la tabla PersonaRUCE.',
        ];
    }
}
