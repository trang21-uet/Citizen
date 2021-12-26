<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class user extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    //Table mà model kết nối với
    protected $table = 'user';

    //Khóa chính
    protected $primaryKey = 'tenTK';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'tenTK',
        'MK',
        'role',
        'created_at',
        'updated_at',
        'manager',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'MK',
        'created_at',
        'updated_at',
    ];

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
