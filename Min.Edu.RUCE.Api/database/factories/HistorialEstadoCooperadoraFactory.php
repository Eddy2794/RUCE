<?php

namespace Database\Factories;

use App\Models\CooperadoraTipoAsociacion;
use App\Models\Expediente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HistorialEstadoCooperadora>
 */
class HistorialEstadoCooperadoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_cooperadora_tipo_asociacion' => $this->faker->randomElement(CooperadoraTipoAsociacion::all()->getQueueableIds()),
            'fk_expediente' => $this->faker->randomElement(Expediente::all()->getQueueableIds()),
        ];
    }
}
