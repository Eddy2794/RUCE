<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsuarioAdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = new Usuario();
        $user1->fkIdPersonaRUCE=1;
        $user1->username = "edgardo";
        $user1->password = "12345";
        $user1->administrador = true;
        $user1->save();

        $user2 = new Usuario();
        $user2->fkIdPersonaRUCE=2;
        $user2->username = "samuel";
        $user2->password = "12345";
        $user2->administrador = true;
        $user2->save();

    }
}
