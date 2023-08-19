<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\OrganizacionRUCE;
use App\Models\PersonaRUCE;
use App\Models\RefCargo;
use App\Models\UsuarioRUCE;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutoridadOrganizacionRUCE>
 */
class AutoridadOrganizacionRUCEFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fkPersonaRUCE' => $this->faker->unique()->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'fkOrganizacionRUCE' => $this->faker->randomElement(OrganizacionRUCE::all()->getQueueableIds()),
            'fkRefCargo' => $this->faker->randomElement(RefCargo::all()->getQueueableIds()),
            'inicioCargo' => $this->faker->dateTimeThisMonth(),
            // 'inicioCargo' => $this->faker->dateTimeThisMonth()->format('d-m-Y H:i:s'),
            // 'finCargo' => $this->faker->dateTimeThisYear()->format('d-m-Y H:i:s'),
            'finCargo' => $this->faker->dateTimeThisYear(),
            'estaActivo' => true,
            // 'fechaEliminacion' => '',
            // 'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            // 'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioAlta' => 1,
            'idUsuarioModificacion' => 1,
        ];
    }
}
