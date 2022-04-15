var validator = {
  kiemTraRong: function (string, idErr, message) {
    let value = string.trim();

    if (value.length > 0) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText = message;

    return false;
  },

  kiemTraTrungId: function (idNew, danhSachSinhVienArr) {
    var index = danhSachSinhVienArr.findIndex((sv) => {
      return sv.id === idNew;
    });

    if (index == -1) {
      document.getElementById("spanMaSV").innerText = "";
      return true;
    }
    document.getElementById("spanMaSV").innerText = "Mã sinh viên đã tồn tại";
    return false;
  },
};