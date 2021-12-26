<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class b2 extends Authenticatable
{
    use HasFactory, Notifiable;
    
    //Table mà model kết nối với
    protected $table = 'b2';

    //Khóa chính
    protected $primaryKey = 'maThon';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
        
    ];

    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'tenThon',
        'maThon',
        'startPermission',
        'endPermission',
        'B1',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function b1() {
        return $this->belongsTo(b1::class, 'tenTK', 'tenTK');
    }

    public function thongtin() {
        return $this->hasMany(thongtin::class, 'B2', 'tenTK');
    }

}
