<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\a3;

class a2 extends Authenticatable
{
    use HasFactory, Notifiable;

    //Table mà model kết nối với
    protected $table = 'a2';

    //Khóa chính
    protected $primaryKey = 'maTinh';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
        
    ];
    
    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'tenTinh',
        'maTinh',
        'startPermission',
        'endPermission',
        'A1',
        'created_at',
        'updated_at',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'MK',
        'created_at',
        'updated_at',
    ];

    public function a1() {
        return $this->belongsTo(a1::class, 'tenTK', 'tenTK');
    }

    public function a3() {
        return $this->hasMany(a3::class, 'A2', 'tenTK');
    }

}
