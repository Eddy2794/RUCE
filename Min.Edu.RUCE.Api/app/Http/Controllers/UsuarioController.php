<?php

namespace App\Http\Controllers;

use App\Models\UsuarioRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = UsuarioRUCE::all();
        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($respuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');

        $data = UsuarioRUCE::where('estaActivo',$estaActivo)->get()->toArray();

        $errores = [];

        // dd($data, $estaActivo, $pageNumber, $pageSize);

        // determina a partir de que indice toma los registros
        $offset = ($pageNumber - 1) * $pageSize;

        // toma los registros a partir del offset teniendo en cuenta pageSize
        $elementos_pagina = array_slice($data, $offset, $pageSize);

        $total_paginas = intval(ceil(count($data) / $pageSize));

        // dd($offset/5+1,$elementos_pagina,count($elementos_pagina),$total_paginas);

        // cuenta la cantidad de elementos se enviar en elementos_pagina
        $cantidad = count($elementos_pagina);

        $respuesta = [
            'entities' => $elementos_pagina,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad,
                'pageSize' => count($data),
                'pageIndex' => $total_paginas,
                'pageNumber' =>  intval($pageNumber)
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'fk_persona' => 'required',
            'username' => 'required',
            'password' => 'required'
        ]);

        $usuario = new UsuarioRUCE();

        $usuario->fk_persona = $request->fk_persona;
        $usuario->nombre_usuario = $request->nombre_usuario;
        $usuario->password = $request->password;
        if($request->administrador)
            $usuario->administrador = $request->administrador;

        $usuario->save();

        return response($usuario);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UsuarioRUCE  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(UsuarioRUCE $usuario): JsonResponse 
    {
        $data = [$usuario];
        $cantidad = count($data);

        $errores = [];

        $respuesta = [
            'entities' => $data,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UsuarioRUCE  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UsuarioRUCE $usuario)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if($usuario->username == $request->username)
            $usuario->update([
                'password' => $request->password,
            ]);
        elseif($usuario->password == $request->password)
            $usuario->update([
                'username' => $request->username,
            ]);
        else
            $usuario->update([
                'password' => $request->password,
                'username' => $usuario->username,
            ]);

        return response($usuario);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UsuarioRUCE  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(UsuarioRUCE $usuario)
    {
        $usuario->delete();
        return response()->noContent();
    }
}
