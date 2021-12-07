<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class a3 extends Model
{
    
    use HasFactory;
    
    protected $table = 'a3';
    protected $primaryKey = 'meHuyen';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

}
