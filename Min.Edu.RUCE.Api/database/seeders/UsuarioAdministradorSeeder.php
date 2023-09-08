<?php

namespace Database\Seeders;

use App\Models\UsuarioRUCE;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsuarioAdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = new UsuarioRUCE();
        $user1->fkPersonaRUCE = 1;
        $user1->username = "super_admin";
        $user1->password = Hash::make('12345');
        $user1->idUsuarioAlta = 1;
        $user1->idUsuarioModificacion = 1;
        $user1->save();

        $role1 = Role::where('name','super_admin')->first();
        $user1->assignRole($role1);

        $user2 = new UsuarioRUCE();
        $user2->fkPersonaRUCE = 2;
        $user2->username = "admin";
        $user2->password = Hash::make('12345');
        $user2->idUsuarioAlta = 1;
        $user2->idUsuarioModificacion = 1;
        $user2->save();

        $role2 = Role::where('name','admin')->first();
        $user2->assignRole($role2);

        $user3 = new UsuarioRUCE();
        $user3->fkPersonaRUCE = 3;
        $user3->username = "viewer";
        $user3->password = Hash::make('12345');
        $user3->idUsuarioAlta = 1;
        $user3->idUsuarioModificacion = 1;
        $user3->save();

        $role3 = Role::where('name','user')->first();
        $user3->assignRole($role3);
    }
}