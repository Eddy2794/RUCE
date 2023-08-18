<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePersonaRUCERequest extends FormRequest
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
            'id' => [
                'required',
                'exists:PersonaRUCE,id'
            ],
            'fkRefTipoDocumentoRUCE' => [
                'required',
                'exists:RefTipoDocumentoRUCE,id'
            ],
            'documento' => [
                'required',
                'integer',
                Rule::unique('PersonaRUCE','documento')->where('documento', $this->documento)->withoutTrashed()
            ],
            'cuil' => [
                'required',
                'string',
                Rule::unique('PersonaRUCE','cuil')->where('cuil', $this->cuil)->withoutTrashed()
            ],
            'nombre' => [
                'required',
                'string',
            ],
            'apellido' => [
                'required',
                'string'
            ],
            'telefono' => [
                'required',
                'string'
            ],
            'email' => [
                'required',
                'string',
                Rule::unique('PersonaRUCE','email')->where('email', $this->email)->withoutTrashed()
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],/*
            'idUsuarioAlta' => [
                'required',
                'integer',
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer',
            ],*/
        ];
    }

    public function messages()
    {
        return [
            'id.exist' => 'Id de Persona no existe en la tabla PersonaRUCE.',
            'fkRefTipoDocumentoRUCE.exist' => 'El tipo de Documento no existe en la tabla RefTipoDocumentoRUCE.',
            'documento.unique' => 'El documento de la Persona ya fue registrado.',
            'cuil.unique' => 'El cuil de la Persona ya fue registrado.',
            'email.unique' => 'El email de la Oganizacion ya fue registrado.',
        ];
    }
}
