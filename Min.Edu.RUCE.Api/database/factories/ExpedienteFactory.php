<?php

namespace Database\Factories;

use App\Models\TipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expediente>
 */
class ExpedienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $valor=$this->faker->randomElement([false,true]);
        return [
            'nro_expediente' => 'exp. nro 0'.strval($this->faker->unique()->numerify("###")),
            
            'fecha' => $this->faker->date("d-m-Y"),

            'observaciones' => $this->faker->randomElement([true,false]),
            'observaciones_respondidas' => $this->faker->randomElement([false,true]),
            'instrumento_publico' => $this->faker->randomElement([true,false]),
            'fiscalia_estado' => $valor? $this->faker->randomElement([false,true]):null,
            'nro_resolucion' => !$valor? strval($this->faker->numerify('###')).$this->faker->randomAscii():null
        ];
    }
}