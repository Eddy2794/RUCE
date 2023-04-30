<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AutoridadComision;
use App\Models\AutoridadOrganizacionRUCE;
use App\Models\Expediente;
use App\Models\Cooperadora;
use App\Models\HistorialCooperadora;
use App\Models\OrganizacionRUCE;
use App\Models\Fondo;
use App\Models\HistorialEstadoCooperadora;
use App\Models\Kiosco;
use App\Models\PersonaRUCE;
use App\Models\Personeria;
use App\Models\AtencionSeguimiento;
use App\Models\UsuarioRUCE;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Ejecucion de Seeders

        $this->call([
            PersonaSeeder::class,
            UsuarioAdministradorSeeder::class,
            RefSeeder::class,
        ]);

        //Ejecucion de Factories

        $cant_registros = 20;

        PersonaRUCE::factory($cant_registros)->create();
        
        UsuarioRUCE::factory($cant_registros)->create();

        Kiosco::factory($cant_registros)->create();

        OrganizacionRUCE::factory($cant_registros)->create();

        AutoridadOrganizacionRUCE::factory($cant_registros)->create();

        Cooperadora::factory($cant_registros)->create();

        AutoridadComision::factory($cant_registros)->create();

        AtencionSeguimiento::factory($cant_registros)->create();

        Fondo::factory($cant_registros)->create();

        Expediente::factory($cant_registros)->create();

        Personeria::factory($cant_registros)->create();

    }
}
