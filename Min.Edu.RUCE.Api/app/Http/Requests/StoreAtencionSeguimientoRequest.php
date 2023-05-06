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
            'fkIdCooperadora'=>[
                'required',
                'exists:Cooperadora,idCooperadora'
            ],
            'fkIdPersonaRUCE'=>[
                'required',
                'exists:PersonaRUCE,idPersonaRUCE'
            ],
            'llamadas'=>[
                'required',
                'integer'
            ],
            'mesajes'=>[
                'required',
                'integer'
            ],
            'emailEnviados'=>[
                'required',
                'integer'
            ],
            'atencionOficina'=>[
                'required',
                'integer'
            ],
            'atencionTerritorial'=>[
                'required',
                'integer'
            ],
            'observacion'=>[
                'required',
                'text'
            ],
            'fecha'=>[
                'required',
                'dateTime'
            ],
            'estaActivo'=>[
                'required',
                'boolean'
            ],
            'fechaEliminacion'=>[
                'required',
                'dateTime'
            ],
            'idUsuarioAlta'=>[
                'required',
                'integer'
            ],
            'idUsuarioModificacion'=>[
                'required',
                'integer'
            ]
        ];
    }

    public function messages()
    {
        return[
            'fkIdCooperadora.exists' => 'Id de Cooperadora no existe en tabla Cooperadora',
            'fkIdPersonaRUCE.exists' => 'Id de PersonaRUCE no existe en tabla PersonaRUCE',
        ];
    }
}
