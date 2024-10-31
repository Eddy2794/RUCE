<?php

namespace App\Exports;

use App\Models\Informe_gral;
use Maatwebsite\Excel\Concerns\FromArray;

class ReportExport implements FromArray
{
    protected $reporte;

    public function __construct(array $reporte)
    {
        $this->reporte = $reporte;
    }

    public function array(): array
    {
        return $this->reporte;
    }
}