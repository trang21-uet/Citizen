<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class thongtin extends Model
{

    use HasFactory;
    
    protected $table = 'thongtin';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $attributes = [
        'cccd' => null,
        'tonGiao' => null,
        'ngheNghiep' => null,
        'B2' => null,
    ];

}
