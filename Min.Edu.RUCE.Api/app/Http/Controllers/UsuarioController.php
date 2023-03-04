<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;


class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Usuario::all());
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

        $usuario = new Usuario();

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
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
        return response($usuario);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
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
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();
        return response()->noContent();
    }
}
