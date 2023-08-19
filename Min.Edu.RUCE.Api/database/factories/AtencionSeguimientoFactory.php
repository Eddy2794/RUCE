<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use App\Models\PersonaRUCE;
use App\Models\UsuarioRUCE;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AtencionSeguimiento>
 */
class AtencionSeguimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'llamadas' => $this->faker->numerify("###"),
            'mensajes' => $this->faker->numerify("###"),
            'emailEnviados' => $this->faker->numerify("###"),
            'atencionOficina' => $this->faker->numerify("###"),
            'atencionTerritorial' => $this->faker->numerify("###"),
            'observacion' => $this->faker->paragraph(1,true),
            'fecha' => $this->faker->date(),
            'fkCooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
            'fkPersonaRUCE' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'estaActivo' => true,
            'fechaEliminacion' => '',
            'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
        ];
    }
}
