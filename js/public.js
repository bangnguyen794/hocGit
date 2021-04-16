var firebaseConfig = {
    apiKey: "AIzaSyDVEV7qMYKtF1F_cepeHtI-PWtUFk-zdZ8",
    authDomain: "vietmyappandroi.firebaseapp.com",
    databaseURL: "https://vietmyappandroi.firebaseio.com",
    projectId: "vietmyappandroi",
    storageBucket: "vietmyappandroi.appspot.com",
    messagingSenderId: "415931179429",
    appId: "1:415931179429:web:eaf81440875b12557f884c",
    measurementId: "G-measurement-id",
  };

  // Initialize Firebase
  var defaultProject = firebase.initializeApp(firebaseConfig);

  console.log(defaultProject);  // "[DEFAULT]"
  
  // Option 1: Access Firebase services via the defaultProject variable
  //var defaultStorage = defaultProject.storage();
  //var defaultFirestore = defaultProject.firestore();
  
  // Option 2: Access Firebase services using shorthand notation
  //defaultStorage = firebase.storage();
  //defaultFirestore = firebase.firestore();

  
var app = angular.module('AppBarCode', []);
app.controller('myAppBarCode', function($scope) {
    $scope.d_soluong = 10; $scope.d_fist = 2020;
    $scope.d_ma1 = "";
    $scope.d_ma2 = "";
   $scope.Fun_clickPrint = function(){
      let ma1 = $scope.d_ma1;
      let ma2 = $scope.d_ma2;
      let soluong = $scope.d_soluong;
      let div = "";
      if(soluong!=0&& soluong<101){
        let fisst = $scope.d_fist; 
        for(var i =fisst;i< ($scope.d_fist+soluong);i++){
           
            if(i % 2 == 0){
                div += `<div style="width:100%;display:flex;">  <div style="margin:auto; width:390px;display:flex;margin-top:0px;padding:4px 7px;box-sizing:border-box">`;

            }
                let ma = ma1+`-`+ma2+`-`+fisst;
                div+=`<svg  class="barcode"
                jsbarcode-format="code39"
                jsbarcode-value="`+ma+`"
                jsbarcode-textmargin="0"
                jsbarcode-width="1"
                jsbarcode-height="35"
                jsbarcode-fontSize="13"
               >
            </svg>`
            if (i % 2 != 0) {
                div += ` </div> </div>`;
                div += `<div style="page-break-after:always;width:100%"> </div>`;
            }
        }
        $("#contenBarcode").html(div).hide();
        JsBarcode(".barcode").init();
        setTimeout(function(){
            printCode($("#contenBarcode").html());
        },500);
      }else{
          alert("Vui lòng điền số lượng in  ");
      }
   }
  
   function printCode(html) {
    //var divContents = document.getElementById("GFG").innerHTML;

    let a = window.open('', '', 'left=0,top=10,width=1,height=1,toolbar=0,scrollbars=0,status=0,height=700, width=800');
    //var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<head> <style> @font-face { font-family: myFirstFontBold; src: url(../components/Fonts/UTM_AvoBold.ttf); } @font-face { font-family: myFirstFont; src: url(../components/Fonts/UTM_Avo.ttf); } .temQr:before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: -1; margin: -2px; border-radius: inherit; background: linear-gradient(to left,#F44336, #efad50, #F44336); }</style> </head><body style="margin:0px" >');
    a.document.write(html);
    a.document.write('</body></html>');

    a.document.close();
    setTimeout(function () {
        a.print();
        a.close();
        a.focus();
    }, 500);


}
//    JsBarcode("#itf-14", "1234567890123", {format: "itf14"});
}); 