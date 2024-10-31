<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrganizacionRUCERequest extends FormRequest
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
            'organizacionDesc' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE', 'organizacionDesc')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->id);
                })->withoutTrashed()
            ],
            'cueAnexo' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE', 'cueAnexo')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->id);
                })->withoutTrashed()
            ],
            'region' => [
                'required',
                'string'
            ],
            'nivel' => [
                'required',
                'string'
            ],
            'localidad' => [
                'required',
                'string'
            ],
            'departamento' => [
                'required',
                'string'
            ],
            'telefono' => [
                'nullable',
                'string'
            ],
            'email' => [
                'nullable',
                'string',
                Rule::unique('OrganizacionRUCE', 'email')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->id);
                })->withoutTrashed()
            ],
            'calle' => [
                'required',
                'string'
            ],
            'numero' => [
                'nullable',
                'string'
            ],
            'barrio' => [
                'required',
                'string'
            ],
            'cp' => [
                'nullable',
                'string'
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
            'id.exist' => 'Id de OrganizacionRUCE no existe en la tabla OrganizacionRUCE.',
            'organizacionDesc.unique' => 'El nombre de la Oganizacion ya fue registrado.',
            'cueAnexo.unique' => 'El CUE de la Ognaizacion ya fue registrado.',
            'telefono.unique' => 'El telefono de la Organizacion ya fue registrado.',
            'email.unique' => 'El email de la Oganizacion ya fue registrado.',
        ];
    }
}
