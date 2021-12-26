<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class thongtin extends Model
{
    use HasFactory, SoftDeletes;
    
    //Table mà model kết nối với
    protected $table = 'thongtin';

    //Khóa chính
    protected $primaryKey = 'ID';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    //Thuộc tính mặc định của các trường
    protected $attributes = [
        'cccd' => null,
        'tonGiao' => null,
        'ngheNghiep' => null,
        'B2' => null,
    ];

    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'ID',
        'cccd',
        'ho',
        'ten',
        'ngaySinh',
        'gioiTinh',
        'queQuan',
        'thuongTru',
        'tamTru',
        'tonGiao',
        'trinhDoVanHoa',
        'ngheNghiep',
        'B2',
        'B1',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
    ];

    public function b1() {
        return this.belongsTo(b1::class,'tenTK', 'B1');
    }

    public function b2() {
        return this.belongsTo(b2::class,'tenTK', 'B2');
    }
}
