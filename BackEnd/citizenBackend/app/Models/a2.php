<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class a2 extends Model
{
    
    use HasFactory;

    protected $table = 'a2';
    protected $primaryKey = 'maTinh';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

}
