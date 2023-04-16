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
            'region' => $this->faker->randomElement(['I','II','III','IV','V','VI','VII']),
            'nivel' => $this->faker->randomElement(["INICIAL","PRIMARIO","SECUNDARIO","SUPERIOR"]),
            'localidad' => strtoupper($this->faker->streetName()),
            'departamento' => strtoupper($this->faker->city()),
            'telefono' => intval("0388".strval($this->faker->numerify("#######"))),
            'email' => strtoupper($this->faker->safeEmailDomain()."@gmail.com"),
            'matricula' => $this->faker->numerify("####"),
            "domicilio" => strtoupper($this->faker->address()),
            'estaActivo' => true,
        ];
    }
}
