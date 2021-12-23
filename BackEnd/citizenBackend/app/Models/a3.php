<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class a3 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    
    protected $table = 'a3';
    protected $primaryKey = 'maHuyen';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
    ];
    
    protected $fillable = [
        'tenHuyen',
        'maHuyen',
        'startPermission',
        'endPermission',
        'A2'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function a2() {
        return $this->belongsTo(a2::class, 'tenTK', 'tenTK');
    }

    public function b1() {
        return $this->hasMany(b1::class, 'A3', 'tenTK');
    }

    public function getAuthPassword() {
        return $this->MK;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }
}
