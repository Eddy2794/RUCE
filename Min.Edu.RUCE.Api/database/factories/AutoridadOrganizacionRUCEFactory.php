<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\OrganizacionRUCE;
use App\Models\PersonaRUCE;
use App\Models\RefCargo;
use App\Models\UsuarioRUCE;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutoridadesEstablecimientoEducativo>
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
            'fkPersonaRUCE' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'fkOrganizacionRUCE' => $this->faker->randomElement(OrganizacionRUCE::all()->getQueueableIds()),
            'fkRefCargo' => $this->faker->randomElement(RefCargo::all()->getQueueableIds()),
            'inicioCargo' => $this->faker->date(),
            'finCargo' => $this->faker->date(),
            'estaActivo' => true,
            'fechaEliminacion' => '',
            'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
        ];
    }
}
