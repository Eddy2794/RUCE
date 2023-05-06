<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAutoridadOrganizacionRUCERequest extends FormRequest
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
            'fkIdRefCargo' => [
                'required',
                'exists:RefCargo,idRefCargo'
            ],
            'fkIdPersonaRUCE' => [
                'required',
                'exists:PersonaRUCE,idPersonaRUCE'
            ],
            'fkIdOrganizacionRUCE' => [
                'required',
                'exists:OrganizacionRUCE,idOrganizacionRUCE'
            ],
            'inicioCargo' => [
                'required',
                'dateTime'
            ],
            'finCargo' => [
                'required',
                'dateTime'
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],
            'fechaEliminacion' => [
                'required',
                'dateTime'
            ],
            'idUsuarioAlta' => [
                'required',
                'integer'
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer'
            ]
        ];
    }

    public function messages()
    {
        return [
            'fkIdRefCargo.exists' => 'Id de Cargo no existe en tabla RefCargo.',
            'fkIdPersonaRUCE.exists' => 'Id de Persona no existe en tabla PersonaRUCE.',
            'fkIdOrganizacionRUCE.exists' => 'Id de Organizacion no existe en tabla fkIdOrganizacionRUCE.'
        ];
    }
}
