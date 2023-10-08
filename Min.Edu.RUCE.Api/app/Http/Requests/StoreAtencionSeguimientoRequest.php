<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAtencionSeguimientoRequest extends FormRequest
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
            'fkCooperadora'=>[
                'required',
                'exists:Cooperadora,id'
            ],
            // 'fkPersonaRUCE'=>[
            //     'exists:PersonaRUCE,id'
            // ],
            'llamadas'=>[
                'nullable',
                'integer'
            ],
            'mesajes'=>[
                'nullable',
                'integer'
            ],
            'emailEnviados'=>[
                'nullable',
                'integer'
            ],
            'atencionOficina'=>[
                'nullable',
                'integer'
            ],
            'atencionTerritorial'=>[
                'nullable',
                'integer'
            ],
            'observacion'=>[
                'nullable',
                'string'
            ],
            'fecha'=>[
                'required',
                'date'
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],
            'idUsuarioAlta' => [
                'nullable',
                'integer',
            ],
            'idUsuarioModificacion' => [
                'nullable',
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return[
            'fkCooperadora.exists' => 'Id de Cooperadora no existe en tabla Cooperadora',
            'fkPersonaRUCE.exists' => 'Id de PersonaRUCE no existe en tabla PersonaRUCE',
        ];
    }
}
