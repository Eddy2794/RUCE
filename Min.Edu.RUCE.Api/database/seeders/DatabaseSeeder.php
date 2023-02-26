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

        TipoAsociacion::factory(10)->create();

        SimpleAsociacion::factory(10)->create();

        AsociacionCivil::factory(10)->create();

        PersoneriaJuridica::factory(10)->create();

        Balances::factory(10)->create();

        ConExpediente::factory(10)->create();

        Persona::factory(10)->create();

        Kiosco::factory(10)->create();

        EstablecimientoEducativo::factory(10)->create();

        AutoridadesEstablecimientoEducativo::factory(10)->create();

        Cooperadora::factory(10)->create();

        AutoridadesCooperadora::factory(10)->create();

        SeguimientoAtencion::factory(10)->create();

        FondosCooperar::factory(10)->create();
    }
}
