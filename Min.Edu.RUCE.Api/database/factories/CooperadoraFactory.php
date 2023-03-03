<?php

namespace Database\Factories;

use App\Models\EstablecimientoEducativo;
use App\Models\Kiosco;
use App\Models\TipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cooperadora>
 */
class CooperadoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'denominacion' => $this->faker->domainName,
            'estado' => $this->faker->randomElement(["verde","amarillo","rojo"]),
            'legajo' => "legajo ".$this->faker->unique()->numerify("###"),
            'decreto' => "decreto ".$this->faker->unique()->numerify("###"),
            'convenio_sc_economicas' => $this->faker->randomElement([true,false]),
            'inscripcion_afip' => $this->faker->randomElement([true,false]),
            'inscripcion_rentas' => $this->faker->randomElement([true,false]),
            'inscripcion_renacopes' => $this->faker->randomElement([true,false]),
            'fecha_creacion' => $this->faker->date(),
            'fk_tipo_asociacion' => $this->faker->randomElement(TipoAsociacion::all()->getQueueableIds()),
            'fk_kiosco' => $this->faker->unique()->randomElement(Kiosco::all()->getQueueableIds()),
            'fk_establecimiento_educativo' => $this->faker->randomElement(EstablecimientoEducativo::all()->getQueueableIds()),
        ];
    }
}