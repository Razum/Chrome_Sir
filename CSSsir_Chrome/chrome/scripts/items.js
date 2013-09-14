
var SIR = angular.module('SIR', []);

SIR.factory('vendor', function () {
    return {
        MozPrefix: function (str) {
            return "-moz-" + str;
        },
        WebkitPrefix: function (str) {
            return "-webkit-" + str;
        },
        OperaPrefix: function (str) {
            return "-o-" + str;
        },
        iePrefix: function (str) {
            return "-ms-" + str;
        },
        oldIEPrefix: function (str) {
            return str
        },
        khtmlPrefix: function (str) {
            return "-khtml-" + str;
        },
        PIE: function (str) {
        }

    }
});

SIR.controller('txtRotationCtrl', function ($scope, vendor) {
    $scope.angle = 0;
    $scope.$watch('angle', function (val) {
        var val = val, str = "";
        $scope.inscrStyle = {'webkitTransform': 'rotate(' + val + 'deg)'};

        var IEM11 = Math.cos(val / 180 * Math.PI).toFixed(6),
            IEM12 = -Math.sin(val / 180 * Math.PI).toFixed(6),
            IEM21 = Math.sin(val / 180 * Math.PI).toFixed(6),
            IEM22 = Math.cos(val / 180 * Math.PI).toFixed(6);
        str += vendor.MozPrefix("transform: rotate(" + val + "deg); /*FF3.5+*/\n");
        str += vendor.OperaPrefix("transform: rotate(" + val + "deg); /*Opera 10.5*/\n");
        str += vendor.WebkitPrefix("transform: rotate(" + val + "deg); /*Saf3.1+, Chrome*/\n");
        str += vendor.khtmlPrefix("transform: rotate(" + val + "deg); /*Konqueror*/\n");
        str += vendor.iePrefix("transform: rotate(" + val + "deg); /*IE9*/\n");
        str += "transform: rotate(" + val + "deg);\n";
        str += vendor.oldIEPrefix("filter: progid:DXImageTransform.Microsoft.Matrix(M11=" + IEM11 + ", M12=" + IEM12 + ",M21=" + IEM21 + ", M22=" + IEM22 + ", sizingMethod='auto expand');/*IE6-IE9*/\nzoom: 1;");


        $scope.resultCode = str;
    });
});


