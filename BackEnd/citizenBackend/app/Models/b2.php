<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class b2 extends Model
{
    
    use HasFactory;
    
    protected $table = 'b2';
    protected $primaryKey = 'maThon';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

}
