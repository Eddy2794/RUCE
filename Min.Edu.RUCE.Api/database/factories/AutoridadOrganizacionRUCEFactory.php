<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\OrganizacionRUCE;
use App\Models\PersonaRUCE;

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
            'fkIdPersonaRUCE' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'fkIdOrganizacionRUCE' => $this->faker->randomElement(OrganizacionRUCE::all()->getQueueableIds()),
            'fkIdRefCargo',
            'estaActivo' => true,
        ];
    }
}
