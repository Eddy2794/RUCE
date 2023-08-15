<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAutoridadComisionRequest extends FormRequest
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
            'fkPersonaRUCE'=>[
                'required',
                'exists:PersonaRUCE,id'
            ],
            'fkRefCargo' => [
                'required',
                'exists:RefCargo,id'
            ],
            'fkComision' => [
                'required',
                'exists:Comision,id'
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
        ];
    }

    public function messages()
    {
        return [
            'fkRefCargo.exists' => 'Id de Cargo no existe en tabla RefCargo.',
            'fkPersonaRUCE.exists' => 'Id de Persona no existe en tabla PersonaRUCE.',
            'fkComision.exists' => 'Id de Comision no existe en tabla Comision.'
        ];
    }
}
