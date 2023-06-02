<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMovimientoExpedienteRequest extends FormRequest
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
            'fkExpediente' => [
                'required',
                'exists:Expediente,id'
            ],
            'fkRefInstanciaInstrumento' => [
                'required',
                'exists:RefInstanciaInstrumento,id'
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkExpediente.exist' => 'Id de Expediente no existe en la tabla Expediente.',
            'fkRefInstanciaInstrumento.exist' => 'Id de Instancia Instrumento no existe en la tabla RefInstanciaInstrumento.',
        ];
    }
}
