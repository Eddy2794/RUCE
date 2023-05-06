<?php

namespace Database\Factories;

use App\Models\Comision;
use App\Models\Cooperadora;
use App\Models\PersonaRUCE;
use App\Models\RefCargo;
use App\Models\UsuarioRUCE;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutoridadComision>
 */
class AutoridadComisionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'inicioCargo' => $this->faker->date(),
            'finCargo' => $this->faker->date(),
            'fkIdPersonaRUCE' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'fkIdRefCargo' => $this->faker->randomElement(RefCargo::all()->getQueueableIds()),
            'fkIdComision' => $this->faker->randomElement(Comision::all()->getQueueableIds()),
            'estaActivo' => true,
            'fechaEliminacion' => '',
            'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
        ];
    }
}
