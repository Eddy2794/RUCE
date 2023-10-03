<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrganizacionRequest extends FormRequest
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
            'organizacionDesc' => 'required|unique:OrganizacionRUCE|max:255',
            'cueAnexo' => 'required|unique:OrganizacionRUCE',
            'telefono' => 'required',
            'email' => 'required|unique:OrganizacionRUCE|max:255',
            'domicilio' => 'required',
            'region' => 'required',
            'localidad' => 'required',
            'departamento' => 'required',
            'nivel' => 'required',
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
}
