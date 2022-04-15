class CongTy{
    constructor(){
        this.DanhSachNhanVien = new Array();
    }
   ThemNhanVien(nhanvienmoi)
    {
        this.DanhSachNhanVien = [...this.DanhSachNhanVien, nhanvienmoi];
    }

    // Tim vi tri ma nhan vien trong mang DanhSachNhanVien, tra ve vi tri
    TimViTriTheoMa(manv){
    // for (var i=e; icthis.DanhSachNhanVien.length; i++){
     // if(....){
     // ...
     // break
     //
     // }
     // ES6:
     for(let vitri in this.DanhSachNhanVien){
       if(this.DanhSachNhanVien[vitri].maNV ===  manv){
         return vitri;
                         
       }
    }
    }
    //Tim nhan vien theo ma, tra ve nhan vien
    TimNhanVienTheoMa (manv){
        for(let nhanvien of this.DanhSachNhanVien){
            if(nhanvien.maNV === manv){
                return nhanvien;
            }
        }
    }
    // Xoa nhan vien theo ma
    XoaNhanVien(manv){
        let vitri = this.TimViTriTheoMa(manv);
        this.DanhSachNhanVien.splice(vitri, 1);
    }
    // Sua thong tin nhan vien, nhap vao nhan vien --> sua thong nhan vien
    SuaNhanVien(nhanvien){
        let vitri = this.TimViTriTheoMa(nhanvien.maNV);
        this.DanhSachNhanVien[vitri-1] = nhanvien;
    }

   

  // Tim nhan vien the loai
  TimNhanVienTheoXepLoai = (TheLoai) => {

    let dskq = new CongTy();


    for(let nhanvien of this.DanhSachNhanVien){
        
        if( TheLoai == "Xuất sắc" && nhanvien.soGio >= 192){
            dskq.DanhSachNhanVien = [ ...dskq.DanhSachNhanVien, nhanvien];
        }else if(TheLoai == "giỏi" && nhanvien.soGio >= 176 && nhanvien.soGio < 192){
            dskq.DanhSachNhanVien = [ ...dskq.DanhSachNhanVien, nhanvien];
        }else if(TheLoai == "Khá" && nhanvien.soGio >= 160  && nhanvien.soGio < 176){
          dskq.DanhSachNhanVien = [ ...dskq.DanhSachNhanVien, nhanvien];
      }else if(TheLoai == "Trung bình" && nhanvien.soGio < 160  ){
        dskq.DanhSachNhanVien = [ ...dskq.DanhSachNhanVien, nhanvien];
      }else if(TheLoai == "ALL"){
        dskq.DanhSachNhanVien = [ ...dskq.DanhSachNhanVien, nhanvien];
      }
    }
    console.log(dskq.DanhSachNhanVien);
        return dskq.DanhSachNhanVien;
}
        
}