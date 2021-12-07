<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class b1 extends Model
{
    
    use HasFactory;
    
    protected $table = 'b1';
    protected $primaryKey = 'maXa';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

}
