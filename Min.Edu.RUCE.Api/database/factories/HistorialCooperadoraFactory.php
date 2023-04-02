<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use App\Models\Expediente;
use App\Models\TipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HistorialCooperadora>
 */
class HistorialCooperadoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_tipo_asociacion' => $this->faker->randomElement(TipoAsociacion::all()->getQueueableIds()),
            'fk_cooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
            'fk_expediente' => $this->faker->randomElement(Expediente::all()->getQueueableIds()),
            
            'fecha' => $this->faker->date("Y-m-d"),
        ];
    }
}
