class NhanVien{



    constructor(maNV, hoTen, email, matkhau, ngayLamViec, chucVu,tongLuong,soGio){
        this.maNV = maNV;
        this.hoTen = hoTen;
        this.email = email;
        this.matkhau = matkhau;
        this.ngayLamViec = ngayLamViec;
        this.chucVu = chucVu;
        this.tongLuong = tongLuong;
        this.soGio = soGio;
        this.mangDoiChieu = [this.maNV, this.hoTen, this.email, this.ngayLamViec, this.tongLuong, this.chucVu, this.soGio];
}
}