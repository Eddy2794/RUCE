<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AutoridadesCooperadora;
use App\Models\AutoridadesEstablecimientoEducativo;
use App\Models\Expediente;
use App\Models\Cooperadora;
use App\Models\CooperadoraTipoAsociacion;
use App\Models\EstablecimientoEducativo;
use App\Models\FondosCooperar;
use App\Models\HistorialEstadoCooperadora;
use App\Models\Kiosco;
use App\Models\Persona;
use App\Models\Personeria;
use App\Models\SeguimientoAtencion;
use App\Models\Usuario;
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
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // $this->call([
        //     TipoAsociacionSeeder::class,
        // ]);

        //Ejecucion de Seeders

        $this->call([
            PersonaSeeder::class,
            UsuarioAdministradorSeeder::class,
            TipoAsociacionTableSeeder::class,
        ]);

        //Ejecucion de Factories

        $cant_registros = 10;

        Persona::factory($cant_registros)->create();
        
        Usuario::factory($cant_registros)->create();

        Kiosco::factory($cant_registros)->create();

        EstablecimientoEducativo::factory($cant_registros)->create();

        AutoridadesEstablecimientoEducativo::factory($cant_registros)->create();

        Cooperadora::factory($cant_registros)->create();

        AutoridadesCooperadora::factory($cant_registros)->create();

        SeguimientoAtencion::factory($cant_registros)->create();

        FondosCooperar::factory($cant_registros)->create();

        CooperadoraTipoAsociacion::factory($cant_registros)->create();

        Expediente::factory($cant_registros)->create();

        Personeria::factory($cant_registros)->create();

        HistorialEstadoCooperadora::factory($cant_registros)->create();
    }
}
