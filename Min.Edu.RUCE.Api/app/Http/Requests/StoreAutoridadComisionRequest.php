<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAutoridadComisionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fkIdPersonaRUCE'=>[
                'required',
                'exists:PersonaRUCE,idPersonaRUCE'
            ],
            'fkIdRefCargo' => [
                'required',
                'exists:RefCargo,idRefCargo'
            ],
            'fkIdComision' => [
                'required',
                'exists:Comision,idComision'
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
            'fkIdComision.exists' => 'Id de Comision no existe en tabla Comision.'
        ];
    }
}
