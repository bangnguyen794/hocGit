$scope.Fun_click_thongbao = function (id, loai) {
    $scope.chitiet_thongbao = _.find($scope.data_thongbao, function (o) { return o.id == id; });
    Change_status_thongbao($scope, $http, id, loai).then(resolve => {

        if (resolve.success) {

            // Cập nhật lại data_thongbao trong localStorage
            if ($scope.chitiet_thongbao.moi) {
                $scope.chitiet_thongbao.moi = false;
                $scope.data_all_menu.data_thongbao.count_thongbao.tongchuaxem--;
            } 

            localStorage.setItem("data_menu", JSON.stringify($scope.data_all_menu));
            $scope.$apply();
            if (loai == 'page') {
                var arayValue = $scope.chitiet_thongbao.value.split(',');
                let page = arayValue[0], id = arayValue[1],link='';
                if (page == "chitietdonhang") {
                    link = location.origin + "/quanly/qlthuonghieu/quanlydonhang_thuonghieu.aspx?mahd=" + id;
                } else if (page == "chitietthuonghieu") {
                    link = location.origin + "/quanly/qlthuonghieu/chitiet_thuonghieu_tk.aspx?id=" + id;
                } else  if (page == "chitietsanpham") {
                    let command = arayValue[2], id_con = arayValue[3];
                    if (command == 'danhgia') {
                        link = location.origin + "/quanly/qlthuonghieu/chitiet_thuonghieu_tk.aspx?id=" + id + "&cm=" + command + "&parent_id=" + id_con;
                    }
                }else  if (page == "kichhoatbaohanh") {
                    link = location.origin + "/quanly/sp_baohanh/sp_baohanh.aspx";
                }else  if (page == "quanlydonhang") {
                    link = location.origin + "/quanly/sp_baohanh/sp_baohanh.aspx";
                }
                window.location.href = check_replaceDomain(link);
            } else   if (loai == 'link') {
                window.location.href = check_replaceDomain($scope.chitiet_thongbao.value);
            } else if (loai == 'popup') {
                $('#myModal-ThongbaoPopup').modal('show');
            }


        } else {
            mscAlert({
                title: resolve.message,  // default: ''
                okText: 'Đóng',    // default: OK
            });
        }


    });


}

