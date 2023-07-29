<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBalanceRequest extends FormRequest
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
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
            ],
            'estadoBalance' => [
                'required',
                'boolean'
            ],
            'estaActivo' => [
                'boolean'
            ],
            'fechaEliminacion' => [
                'date'
            ],
            'idUsuarioAlta' => [
                'integer'
            ],
            'idUsuarioModificacion' => [
                'integer'
            ]
        ];
    }

    public function messages()
    {
        return [
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperdora.',
        ];
    }
}
