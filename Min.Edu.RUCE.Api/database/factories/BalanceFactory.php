<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use App\Models\UsuarioRUCE;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Balance>
 */
class BalanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fkCooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
            'estadoBalance' => false,
            'estaActivo' => true,
            'fechaEliminacion' => '',
            'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
        ];
    }
}
