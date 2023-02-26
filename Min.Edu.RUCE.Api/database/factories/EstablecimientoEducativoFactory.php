<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EstablecimientoEducativo>
 */
class EstablecimientoEducativoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'cue' => intval("380".$this->faker->unique()->numerify("######")),
            'region' => $this->faker->randomElement([1,2,3,4,5]),
            'nivel' => $this->faker->randomElement(["primario","secundario","terciario","superior","universitario"]),
            'localidad' => $this->faker->streetName(),
            'departamento' => $this->faker->city(),
            'telefono' => intval("0388".strval($this->faker->numerify("#######"))),
            'email' => $this->faker->safeEmailDomain()."@gmail.com",
            'matricula' => $this->faker->numerify("####"),
            "domicilio" => $this->faker->address()
        ];
    }
}
