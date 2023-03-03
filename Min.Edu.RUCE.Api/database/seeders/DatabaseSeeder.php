<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AsociacionCivil;
use App\Models\AutoridadesCooperadora;
use App\Models\AutoridadesEstablecimientoEducativo;
use App\Models\Balances;
use App\Models\ConExpediente;
use App\Models\Cooperadora;
use App\Models\EstablecimientoEducativo;
use App\Models\FondosCooperar;
use App\Models\Kiosco;
use App\Models\Persona;
use App\Models\PersoneriaJuridica;
use App\Models\SeguimientoAtencion;
use App\Models\TipoAsociacion;
use App\Models\SimpleAsociacion;
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

        $cant_registros = 10;

        TipoAsociacion::factory($cant_registros)->create();

        SimpleAsociacion::factory($cant_registros)->create();

        AsociacionCivil::factory($cant_registros)->create();

        PersoneriaJuridica::factory($cant_registros)->create();

        Balances::factory($cant_registros)->create();

        ConExpediente::factory($cant_registros)->create();

        Persona::factory($cant_registros)->create();

        Kiosco::factory($cant_registros)->create();

        EstablecimientoEducativo::factory($cant_registros)->create();

        AutoridadesEstablecimientoEducativo::factory($cant_registros)->create();

        Cooperadora::factory($cant_registros)->create();

        AutoridadesCooperadora::factory($cant_registros)->create();

        SeguimientoAtencion::factory($cant_registros)->create();

        FondosCooperar::factory($cant_registros)->create();
    }
}
