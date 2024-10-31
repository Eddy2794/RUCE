<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePersonaRUCERequest extends FormRequest
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
        //dd(request());
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
                Rule::unique('PersonaRUCE', 'documento')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->fkPersonaRUCE);
                })->withoutTrashed()
            ],
            'cuil' => [
                'required',
                'string',
                Rule::unique('PersonaRUCE', 'cuil')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->fkPersonaRUCE);
                })->withoutTrashed()
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
                'string',
                Rule::unique('PersonaRUCE', 'telefono')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->fkPersonaRUCE);
                })->withoutTrashed()
            ],
            'email' => [
                'nullable',
                'string',
                Rule::unique('PersonaRUCE', 'email')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->fkPersonaRUCE);
                })->withoutTrashed()
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
        return [
            'id.exist' => 'Id de Persona no existe en la tabla PersonaRUCE.',
            'fkRefTipoDocumentoRUCE.exist' => 'El tipo de Documento no existe en la tabla RefTipoDocumentoRUCE.',
            'documento.unique' => 'El documento de la Persona ya fue registrado.',
            'cuil.unique' => 'El cuil de la Persona ya fue registrado.',
            'email.unique' => 'El email de la persona ya fue registrado.',
            'telefono.unique' => 'El telefono de la persona ya fue registrado.',
        ];
    }
}
