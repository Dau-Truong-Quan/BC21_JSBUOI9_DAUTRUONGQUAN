

var nhanvien_1 = new NhanVien("abc", "Nguyễn Văn A", "nguyenvana@gmail.com",
                                          "12345678", "10/10/2017", "Sếp", "5000000","185");
var nhanvien_2 = new NhanVien("bcd", "Nguyễn Văn B", "nguyenvanb@gmail.com",
                                          "12345678", "10/10/2017", "Nhân viên", "8000000","165");
var congty = new CongTy();
congty.ThemNhanVien(nhanvien_1);
congty.ThemNhanVien(nhanvien_2);

let trangHienTai = 1;

GoiModal = (modal_title, readonly = false, type = 1) => { //type = 1: them nhan vien, type = 2: sua
    document.getElementById("header-title").innerHTML = modal_title;
    document.getElementById("tknv").readonly = readonly;
    switch(type){
        case 1: //Them nhan vien
            document.getElementById("btnThemNV").style.display = "block";
            document.getElementById ("btnCapNhat").style.display = "none";
        break;
        case 2: //Sua thong tin nhan vien
            document.getElementById("btnThemNV").style.display = "none";
            document.getElementById("btnCapNhat").style.display = "block";
        break;
    }
}

SuaNhanVien = (idButton) => {
    document.getElementById (idButton).addEventListener("click", ()=>{
        let id =idButton;
      let mangTam = id.split("_");
      let maNV = mangTam[1];
    


      let nhanvien = congty.TimNhanVienTheoMa(maNV);
      console.log(nhanvien);
        document.getElementById("tknv").value = nhanvien.maNV;
        document.getElementById("name").value = nhanvien.hoTen;
        document.getElementById("email").value = nhanvien. email;
        document.getElementById("password").value = nhanvien.matKhau;
        document.getElementById("datepicker").value = nhanvien.ngayLamViec;
        
        document.getElementById ("luongCB").value = nhanvien.tongLuong;
        document.getElementById ("gioLam").value = nhanvien.soGio;                           
    })

    GoiModal("CẬP NHẬT THÔNG TIN", true, 2);

   
}
XoaNhanVien = (idButton) => {
    document.getElementById (idButton).addEventListener("click", ()=>{
        let id =idButton;
      let mangTam = id.split("_");
      let maNV = mangTam[1];
    
      let nhanvien = congty.TimNhanVienTheoMa(maNV);
      congty.XoaNhanVien(nhanvien);
      swal("XÓA THÀNH CÔNG", "Danh sách nhân viên đã được cập nhật", "success");  
      
      HienThiDanhSach(congty.DanhSachNhanVien);
    })

   

   
}


HienThiDanhSach = (dsnv) => {
    let tbody = document.getElementById("tableDanhSach");
    tbody.innerHTML = "";
    let soNV = dsnv.length;
    let nv, tr, td;
               
    let ulPhanTrang = document.getElementById("ulPhanTrang");
     ulPhanTrang.innerHTML = "";
      let soDong = 10;
      let batDau = (trangHienTai-1)*soDong; 
        let ketThuc= trangHienTai*soDong;

      let soTrang = Math.ceil(soNV / soDong);

      for(let i = 1; i <= soTrang; i++){
        let li = document.createElement('li');
        ulPhanTrang.appendChild(li);
        let a = document.createElement ('a');
        a.setAttribute("class", "page-link");
        a.setAttribute("id", "trang_" + i);
        a.innerHTML = i;
        li.appendChild(a);
       // Thieu chuc nang chuyen trang
    }

      if(soNV < ketThuc){
        ketThuc = soNV;
    }
    for (let i=batDau; i < ketThuc; i++){
        nv = dsnv[i];
        tr = document.createElement('tr');
        tbody.appendChild(tr);
       for (let j=0; j<nv.mangDoiChieu.length; j++){
        if(j == 6 ){
            if(nv.mangDoiChieu[j]*1 >= 192  ){
                td = document.createElement('td');
                td.innerHTML = "Xuất sắc";
                tr.appendChild(td);
            }else if(nv.mangDoiChieu[j]*1 >= 176  ){
                td = document.createElement('td');
                td.innerHTML = "giỏi";
                tr.appendChild(td);
            }else if(nv.mangDoiChieu[j]*1 >= 160  ){
                td = document.createElement('td');
                td.innerHTML = "Khá";
                tr.appendChild(td);
            }else {
                td = document.createElement('td');
                td.innerHTML = "Trung bình";
                tr.appendChild(td);
            }
        }
            if(j == 4   || j == 6){
                continue;
            }
            
            td = document.createElement('td');
            td.innerHTML = nv.mangDoiChieu[j];
            tr.appendChild(td);
            
            if(nv.mangDoiChieu[j] == "Sếp"){

                td = document.createElement('td');
                td.innerHTML = nv.mangDoiChieu[4]*3;
                tr.appendChild(td);
                console.log(nv.mangDoiChieu[5]);
            }else if(nv.mangDoiChieu[j] == "Trưởng phòng"){
                td = document.createElement('td');
                td.innerHTML = nv.mangDoiChieu[4]*2;
                tr.appendChild(td);
            }else if(nv.mangDoiChieu[j] == "Nhân viên"){
                td = document.createElement('td');
                td.innerHTML = nv.mangDoiChieu[4]*1;
                tr.appendChild(td);
            }
           
        }
        let button__sua = `<a class="btn btn-primary" data-toggle="modal" href="#myModal" id="sua_${nv.maNV}" ><em class="fa fa-pencil"></em></a>`;
        let button__xoa = `<a class="btn btn-danger"  id="xoa_${nv.maNV}" ><em class="fa fa-trash"></em></a>`;
            
        td = document.createElement ('td');
        td.innerHTML = button__sua + button__xoa;
        td.setAttribute("align", "center");
        tr.appendChild(td);

        SuaNhanVien("sua_"+nv.maNV);
        XoaNhanVien(("xoa_"+nv.maNV));

    }

  
   
   
}


HienThiDanhSach(congty.DanhSachNhanVien);
const validatePassword = (pass) => {
    return String(pass)
      .match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      );
  };


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function allLetter(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   if(inputtxt.match(letters))
     {
      return true;
     }
   else
     {
     
     return false;
     }
  }

    

document.getElementById("btnThemNV").addEventListener("click", () => {
    // validation
     let maNV = document.getElementById("tknv").value;
     let hoTen = document.getElementById("name").value; 
     let email = document.getElementById("email").value;
     let matkhau = document.getElementById("password").value;
     let ngayLam = document.getElementById("datepicker").value;
     let luongCB = document.getElementById("luongCB").value;
     let chucVu = document.getElementById("chucvu").value;
     let gioLam = document.getElementById("gioLam").value;


     
     var isValid = true;
    

    isValid = validator.kiemTraRong(
        maNV,
      "tbTKNV",
      "Tài khoản không được để rỗng"
    ) &
    validator.kiemTraRong(
        hoTen,
      "tbTen",
      "tên không được để rỗng"
    ) &
    
    validator.kiemTraRong(
        email,
      "tbEmail",
      "email không được để rỗng"
    ) &
    validator.kiemTraRong(
        email,
      "tbEmail",
      "email không được để rỗng"
    ) &
    validator.kiemTraRong(
        matkhau,
      "tbMatKhau",
      "mẩu khẩu không được để rỗng"
    ) &
    validator.kiemTraRong(
        luongCB,
      "tbLuongCB",
      "lương cơ bản không được để rỗng"
    ) &
    validator.kiemTraRong(
        gioLam,
      "tbGiolam",
      "giờ làmkhông được để rỗng"
    );
    if(!validateEmail(email)){
        document.getElementById("tbEmail").innerText = "email không đúng định dạng";
        isValid = false;
    }
    if(!allLetter(hoTen)){
        document.getElementById("tbTen").innerText = "tên không đúng định dạng";
        isValid = false;
    }

    if(!(validatePassword)){
        document.getElementById("tbMatKhau").innerText = "Minimum eight characters, at least one letter, one number and one special character";
        isValid = false;
    }
    if(luongCB*1 < 1000000 || luongCB*1 > 2000000){
        document.getElementById("tbLuongCB").innerText = "Lương phải từ 1000000-2000000";
        isValid = false;
    }
    if(gioLam*1 < 80 || gioLam*1 > 200){
        document.getElementById("tbGiolam").innerText = "số giờ làm phải từ 80-200";
        isValid = false;
    }
    if(document.getElementById("chucvu").value == "Chọn chức vụ"){
        document.getElementById("tbChucVu").innerText = "vui lòng chọn chức vụ hợp lí";
        isValid = false;
    }

    if(isValid){
        let nhanvienmoi = new NhanVien(maNV, hoTen, email, matkhau, ngayLam, chucVu,luongCB,gioLam);
        congty.ThemNhanVien(nhanvienmoi);
        swal("THÊM THÀNH CÔNG", "Danh sách nhân viên đã được cập nhật", "success");
         console.log(congty.DanhSachNhanVien);
        HienThiDanhSach(congty.DanhSachNhanVien);
        console.log(maNV + " " +hoTen );
    }else {
        swal("THÊM THÀNH THẤT BẠI", "Vui lòng nhập lại", "error");
        return;
    }
    
            
     
 })




document.getElementById("btnThem").addEventListener ("click", () => {
    XoaForm();
    GoiModal("THEM NGƯỜI DÙNG")
})
document.getElementById("btnThem").addEventListener ("click", () => {
    XoaForm();
    GoiModal("THEM NGƯỜI DÙNG")
})

 XoaForm = () => {
    let elements = document.getElementsByClassName("input-sm");
    for(let element of elements){
    element.value = "";

        
    }
    document.getElementById("chucvu").selectedIndex = 0;
}

timChucVuTheoMa = () =>{
    var select = document.getElementById('chucvu');
    
    for (let index = 0; index < 4; index++) {
        if(select.options[index].value === "Sếp"){
            document.getElementById('chucvu').selectedIndex = 1;
        }else if(select.options[index].value === "Trưởng phòng"){
            document.getElementById('chucvu').selectedIndex = 2;
        }else {
            document.getElementById('chucvu').selectedIndex = 3;
        }
    }
  
    
}
timChucVuTheoMa();



document.getElementById("btnCapNhat").addEventListener("click", ()=>{
    let maNV = document.getElementById ("tknv").value;
    let hoten = document.getElementById("name").value;
    let email = document.getElementById ("email").value;
    let matkhau = document.getElementById("password").value;
    let ngayLam  = document.getElementById("datepicker").value;
    
    let luongCB = document.getElementById("luongCB").value;
     let chucVu = document.getElementById("chucvu").value;
     let gioLam = document.getElementById("gioLam").value;


     var isValid = true;
    

     isValid = validator.kiemTraRong(
         maNV,
       "tbTKNV",
       "Tài khoản không được để rỗng"
     ) &
     validator.kiemTraRong(
        hoten,
       "tbTen",
       "tên không được để rỗng"
     ) &
     
     validator.kiemTraRong(
         email,
       "tbEmail",
       "email không được để rỗng"
     ) &
     validator.kiemTraRong(
         email,
       "tbEmail",
       "email không được để rỗng"
     ) &
     validator.kiemTraRong(
         matkhau,
       "tbMatKhau",
       "mẩu khẩu không được để rỗng"
     ) &
     validator.kiemTraRong(
         luongCB,
       "tbLuongCB",
       "lương cơ bản không được để rỗng"
     ) &
     validator.kiemTraRong(
         gioLam,
       "tbGiolam",
       "giờ làmkhông được để rỗng"
     );
     if(!validateEmail(email)){
         document.getElementById("tbEmail").innerText = "email không đúng định dạng";
         isValid = false;
     }
     if(!allLetter(hoten)){
         document.getElementById("tbTen").innerText = "tên không đúng định dạng";
         isValid = false;
     }
 
     if(!(validatePassword)){
         document.getElementById("tbMatKhau").innerText = "Minimum eight characters, at least one letter, one number and one special character";
         isValid = false;
     }
     if(luongCB*1 < 1000000 || luongCB*1 > 2000000){
         document.getElementById("tbLuongCB").innerText = "Lương phải từ 1000000-2000000";
         isValid = false;
     }
     if(gioLam*1 < 80 || gioLam*1 > 200){
         document.getElementById("tbGiolam").innerText = "số giờ làm phải từ 80-200";
         isValid = false;
     }
     if(document.getElementById("chucvu").value == "Chọn chức vụ"){
         document.getElementById("tbChucVu").innerText = "vui lòng chọn chức vụ hợp lí";
         isValid = false;
     }

     if(isValid){
        let nhanvienmoi = new NhanVien(maNV, hoten, email, matkhau, ngayLam, chucVu,luongCB,gioLam);
        congty.SuaNhanVien(nhanvienmoi);

        swal("CẬP NHẬT THÀNH CÔNG", "Danh sách nhân viên đã được cập nhật", "success");
        HienThiDanhSach(congty.DanhSachNhanVien);
        $('#myModal').modal('hide');
    }else {
        swal("CẬP NHẬT THẤT BẠI", "Vui lòng nhập lại", "error");
        return;
    }

    
})


var activities = document.getElementById("searchXepLoai");

activities.addEventListener("change", function() {
    console.log(activities.value);
    HienThiDanhSach(congty.TimNhanVienTheoXepLoai(activities.value));
   
});
