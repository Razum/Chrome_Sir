
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

SIR.factory('utils', function () {
    return {
        toHEX: function (val) {
            val = val.toString(16);
            if (val.length === 1) {
                val = '0' + val;
            }
            return val.toUpperCase();
        },
        toRGB: function (hex) {
            var color = (hex.charAt(0) == "#") ? hex.substring(1) : hex;
            return {
                "red": parseInt(color.substring(0, 2), 16),
                "green": parseInt(color.substring(2, 4), 16),
                "blue": parseInt(color.substring(4, 6), 16)
            };
        }
    };
});


//////////////////
//Text Rotation//
////////////////
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



//////////////////
//     RGBA    //
////////////////

SIR.controller('RGBACtrl', function ($scope, vendor, utils) {
    $scope.red = 255;
    $scope.green = 0;
    $scope.blue = 0;
    $scope.opacity = 0.7;

    var ranges = ['red', 'green', 'blue', 'opacity'];
    for (var i = ranges.length; i--;) {
        $scope.$watch(ranges[i], onParamsChange);
    }

    function onParamsChange () {
        var red = $scope.red,
            green = $scope.green,
            blue = $scope.blue,
            opacity = $scope.opacity;
        $scope.blockStyle = {backgroundColor: "rgba(" + red + "," + green + "," + blue + "," + opacity + ")"};

        var forIE = Math.floor(255 * opacity).toString(16) + utils.toHEX(red) + utils.toHEX(green) + utils.toHEX(blue);
        var str = "background: rgb(" + red + ", " + green + ", " + blue + ");\nbackground: transparent;\n";
        str += "background: rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ");/* FF3+,Saf3+,Opera 10.10+,Chrome,IE9*/\n";
        str += vendor.oldIEPrefix("filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#" + forIE + ",endColorstr=#" + forIE + ");/*IE 5.5-7*/\n");
        str += vendor.iePrefix('filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + forIE + ',endColorstr=#' + forIE + ')";/*IE8*/\n');
        str += "zoom: 1;"
        $scope.resultCode = str;

    };
});


//////////////////
//  Transform  //
////////////////

SIR.controller('TransformCtrl', function ($scope, vendor) {
    $scope.rotate = 0;
    $scope.scaleX = 1;
    $scope.scaleY = 1;
    $scope.skewX = 0;
    $scope.skewY = 0;
    $scope.translateX = 0;
    $scope.translateY = 0;

    var ranges = ['rotate', 'scaleX', 'scaleY', 'skewX', 'skewY', 'translateX', 'translateY'];
    for (var i = ranges.length; i--;) {
        $scope.$watch(ranges[i], onParamsChange);
    }

    function onParamsChange () {
        var rotate = $scope.rotate,
            scaleX = $scope.scaleX,
            scaleY = $scope.scaleY,
            skewX = $scope.skewX,
            skewY = $scope.skewY,
            translateX = $scope.translateX,
            translateY = $scope.translateY;
        $scope.blockStyle = {'webkitTransform': 'rotate(' + rotate + 'deg) scale(' + scaleX + ', ' + scaleY + ') skewX(' + skewX + 'deg) skewY(' + skewY + 'deg) translate(' + translateX + 'px, ' + translateY + 'px)'};
        var str = "";
        str += vendor.MozPrefix("transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skewX(" + skewX + "deg) skewY(" + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);/* FF3.5+ */\n");
        str += vendor.WebkitPrefix("transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skew(" + skewX + "deg, " + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);/*Saf3.1+, Chrome*/\n");
        str += vendor.OperaPrefix("transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skew(" + skewX + "deg, " + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);/* Opera 10.5 */\n");
        str += vendor.khtmlPrefix("transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skew(" + skewX + "deg, " + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);/* Konqueror */\n");
        str += vendor.iePrefix("transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skew(" + skewX + "deg, " + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);/* IE 9 */\n");
        str += "transform: rotate(" + rotate + "deg) scale(" + scaleX + ", " + scaleY + ") skew(" + skewX + "deg, " + skewY + "deg) translate(" + translateX + "px, " + translateY + "px);\n";
        $scope.resultCode = str;
    }
});

/////////////////////////
//  Multiple Columns  //
///////////////////////

SIR.controller('txtColumnsCtrl', function ($scope, vendor) {
    $scope.count = 1;
    $scope.gap = 0;
    $scope.rules = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'outset'];
    $scope.rule = 'none';

    var vals = ['count', 'gap', 'rule'];
    for (var i = vals.length; i--;) {
        $scope.$watch(vals[i], onParamsChange);
    }

    function onParamsChange () {
        var count = $scope.count,
            gap = $scope.gap,
            rule = $scope.rule;

        $scope.blockStyle = {"-webkit-column-count":  count,  "-webkit-column-gap": gap + "px", "-webkit-column-rule": rule};
    }

});

/////////////////////////
//    Border Radius   //
///////////////////////

SIR.controller('borderRadiusCtrl', function ($scope, vendor) {
    $scope.brStyles = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'outset'];
    $scope.brStyle = 'none';
    $scope.color = "#c14343";
    $scope.width = 2;
    $scope.brTL = 0;
    $scope.brTR = 0;
    $scope.brBR = 0;
    $scope.brBL = 0;

    var ranges = ['brStyle', 'width', 'brTL', 'brTR', 'brBR', 'brBL', 'color'];
    for (var i = ranges.length; i--;) {
        $scope.$watch(ranges[i], onParamsChange);
    }

    function onParamsChange () {
        var brStyle = $scope.brStyle,
            width = $scope.width,
            color = $scope.color,
            brTL = $scope.brTL,
            brTR = $scope.brTR,
            brBR = $scope.brBR,
            brBL = $scope.brBL;
        $scope.blockStyle = {"border": width + "px " + brStyle + " " + color, borderRadius: brTL + "px " + brTR + "px " + brBR + "px " + brBL + "px"};


        var str = "border: " + width + "px " + " " + brStyle + " " + color + ";\n";
        if (brTL == brTR && brTR == brBL && brBL == brBR) {
            str += vendor.MozPrefix("border-radius: " + brTL + "px" + ";/*Firefox*/\n");
            str += vendor.WebkitPrefix("border-radius: " + brTL + "px" + ";/*Safari, Chrome*/\n");
            str += vendor.khtmlPrefix("border-radius: " + brTL + "px" + ";/*Konqueror*/\n");
            str += "border-radius: " + brTL + "px" + ";\n";
            $scope.resultCode = str;
            return true;
        }
        if (brTL == brBR && brTR == brBL && brTR != brTL) {

            str += vendor.MozPrefix("border-radius: " + brTL + "px " + brTR + "px" + ";/*Firefox*/\n");
            str += vendor.WebkitPrefix("border-radius: " + brTL + "px" + " " + brTR + "px" + ";/*Safari, Chrome*/\n");
            str += vendor.khtmlPrefix("border-radius: " + brTL + "px" + " " + brTR + "px" + ";/*Konqueror*/\n");
            str += "border-radius: " + brTL + "px" + " " + brTR + "px" + ";\n";
            $scope.resultCode = str;
            return true;
        }
        if (brTR == brBL && brTL != brBR && brTR != brTL) {
            str += vendor.MozPrefix("border-radius: " + brTL + "px" + " " + brTR + "px" + " " + brBR + "px" + ";/*Firefox*/\n");
            str += vendor.WebkitPrefix("border-radius: " + brTL + "px" + " " + brTR +"px" + " " + brBR + "px" + ";/*Safari, Chrome*/\n");
            str += vendor.khtmlPrefix("border-radius: " + brTL + "px" + " " + brTR + "px" + " " + brBR + "px" + ";/*Konqueror*/\n");
            str += "border-radius: " + brTL + "px" + " " + brTR + "px" + " " + brBR + "px" + ";\n";
            $scope.resultCode = str;
            return true;
        }


            str += "/*Firefox*/\n";

        str += vendor.MozPrefix("border-top-left-radius: " + brTL + "px" + ";\n");
        str += vendor.MozPrefix("border-top-right-radius: " + brTR + "px" + ";\n");
        str += vendor.MozPrefix("border-bottom-right-radius: " + brBR + "px" + ";\n");
        str += vendor.MozPrefix("border-bottom-left-radius: " + brBL + "px" + ";\n");

            str += "/*Safari, Chrome*/\n";

        str += vendor.WebkitPrefix("border-top-left-radius: " + brTL + "px" + ";\n");
        str += vendor.WebkitPrefix("border-top-right-radius: " + brTR + "px" + ";\n");
        str += vendor.WebkitPrefix("border-bottom-right-radius: " + brBR + "px" + ";\n");
        str += vendor.WebkitPrefix("border-bottom-left-radius: " + brBL + "px" + ";\n");

            str += "/*Konqueror*/\n";

        str += vendor.khtmlPrefix("border-top-left-radius: " + brTL + "px" + ";\n");
        str += vendor.khtmlPrefix("border-top-right-radius: " + brTR + "px" + ";\n");
        str += vendor.khtmlPrefix("border-bottom-right-radius: " + brBR + "px" + ";\n");
        str += vendor.khtmlPrefix("border-bottom-left-radius: " + brBL + "px" + ";\n");
        str += "border-top-left-radius: " + brTL + "px" + ";\n";
        str += "border-top-right-radius: " + brTR + "px" + ";\n";
        str += "border-bottom-right-radius: " + brBR + "px" + ";\n";
        str += "border-bottom-left-radius: " + brBL + "px" + ";\n";
        $scope.resultCode = str;


    }

});


//////////////////
//   Outline   //
////////////////

SIR.controller('OutlineCtrl', function ($scope, vendor) {
    $scope.outlineStyles = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'outset'];
    $scope.outlineStyle = 'none',
    $scope.color = '#000',
    $scope.width = 2,
    $scope.offset = 2;

    var ranges = ['outlineStyle', 'width', 'offset', 'color'];
    for (var i = ranges.length; i--;) {
        $scope.$watch(ranges[i], onParamsChange);
    }

    function onParamsChange () {
        var outlineStyle = $scope.outlineStyle,
            width = $scope.width,
            color = $scope.color,
            offset = $scope.offset;

        $scope.blockStyle = {outline: width + "px " + outlineStyle + " " + color, outlineOffset: offset + "px"};
        var str = "";
        str = "outline: " + width + "px " + outlineStyle + " " + color + ";\n";
        if (offset != 0) {
            str += "outline-offset: " + offset + "px";
        }
        $scope.resultCode = str;

    }

});

//////////////////////
//   Text-shadow   //
////////////////////

SIR.controller('txtShadow', function ($scope, vendor) {
    $scope.shadows = [
        {horLen: 0, verLen: 0, blur: 0, color: "#ccc"}
    ];

    $scope.$watch('shadows', onParamsChange, true);

    $scope.add = function () {
        $scope.shadows.push({horLen: 0, verLen: 0, blur: 0, color: "#ccc"});
    };
    $scope.remove = function () {
        $scope.shadows.pop();
    };

    function onParamsChange () {
        var shadows = $scope.shadows,
            str = "",
            shadow_arr = [];

        var IEdirection = (Math.round(Math.atan2(shadows[0].verLen, shadows[0].horLen) * 180 / Math.PI) + 90) % 360,
            IEblurRad = shadows[0].blur,
            IEcolor = shadows[0].color;
        IEdirection < 0 && (IEdirection += 360);

        for (var i = 0, len = shadows.length;  i < len; i++) {
            shadow_arr.push(shadows[i].horLen + "px " + shadows[i].verLen + "px " + shadows[i].blur + "px " + shadows[i].color);
        }
        $scope.inscrStyle = {textShadow: shadow_arr.join(", ")};

        str += vendor.iePrefix('filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + ')";/*IE 8*/\n');
        str += "text-shadow: " + shadow_arr.join(", ") + ";/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */\n";
        str += vendor.oldIEPrefix('filter: progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + '); /*IE 5.5-7*/\n');
        $scope.resultCode = str;
    };
});




//////////////////////
//    Box-shadow   //
////////////////////

SIR.controller('boxShadow', function ($scope, vendor) {
    $scope.shadows = [
        {horLen: 0, verLen: 0, blur: 0, color: "#ccc"}
    ];

    $scope.$watch('shadows', onParamsChange, true);

    $scope.add = function () {
        $scope.shadows.push({horLen: 0, verLen: 0, blur: 0, color: "#ccc"});
    };
    $scope.remove = function () {
        $scope.shadows.pop();
    };

    function onParamsChange () {
        var shadows = $scope.shadows,
            str = "",
            shadow_arr = [];

        var IEdirection = (Math.round(Math.atan2(shadows[0].verLen, shadows[0].horLen) * 180 / Math.PI) + 90) % 360,
            IEblurRad = shadows[0].blur,
            IEcolor = shadows[0].color;
        IEdirection < 0 && (IEdirection += 360);

        for (var i = 0, len = shadows.length;  i < len; i++) {
            shadow_arr.push(shadows[i].horLen + "px " + shadows[i].verLen + "px " + shadows[i].blur + "px " + shadows[i].color);
        }
        $scope.blockStyle = {boxShadow: shadow_arr.join(", ")};


        str += vendor.iePrefix('filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + ')";/*IE 8*/\n');
        str += vendor.MozPrefix("box-shadow:" + shadow_arr.join(",") + ";/*FF 3.5+*/\n");
        str += vendor.WebkitPrefix("box-shadow:" + shadow_arr.join(",") + ";/*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/\n");
        str += vendor.khtmlPrefix("box-shadow:" + shadow_arr.join(",") + ";/*Konqueror*/\n");
        str += "box-shadow:" + shadow_arr.join(",") + ";/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */\n";
        str += vendor.oldIEPrefix('filter: progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + '); /*IE 5.5-7*/\n');
        $scope.resultCode = str;



        str += vendor.iePrefix('filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + ')";/*IE 8*/\n');
        str += "text-shadow: " + shadow_arr.join(", ") + ";/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */\n";
        str += vendor.oldIEPrefix('filter: progid:DXImageTransform.Microsoft.Shadow(Strength=' + IEblurRad + ', Direction=' + IEdirection + ', Color=' + IEcolor + '); /*IE 5.5-7*/\n');
        $scope.resultCode = str;
    };
});

//////////////////////////
//   Linear Gradient   //
////////////////////////

SIR.controller('linearGradientCtrl', function ($scope, vendor) {
    $scope.stops = [
        {val: 0, color: "#eb3838"},
        {val: 0, color: "#d5d311"}
    ];

    $scope.angle = 0;

    $scope.$watch('stops', onParamsChange, true);
    $scope.$watch('angle', onParamsChange);

    $scope.add = function () {
        $scope.stops.push({val: 0, color: "#ccc"});
    };
    $scope.remove = function () {
        $scope.stops.pop();
    };

    function onParamsChange () {
        var W3Cangle = $scope.angle,
            angle = (450 - $scope.angle) % 360,
            ieFrom = $scope.stops[0].color,
            ieTo = $scope.stops[$scope.stops.length - 1].color,
            ieType = Math.abs(angle) === 90 ? 0 : 1;
        var str = "", stop_arr = [],
            webkit_stop_arr = [];

        $scope.stops.sort(function (a, b){
            return a.val - b.val;
        });


        for(var i = 0, len = $scope.stops.length; i<len; i++) {
            stop_arr.push($scope.stops[i].color + " " + $scope.stops[i].val + "%");
            webkit_stop_arr.push("color-stop(" + $scope.stops[i].val + "%, " + $scope.stops[i].color + ")");
        }
        $scope.blockStyle = {backgroundImage: "-webkit-gradient(linear, " + angle + "deg, " + webkit_stop_arr.join(", ")};
        $scope.blockStyle = {backgroundImage: "-webkit-linear-gradient(" + angle + "deg, " + stop_arr.join(", ")};


        str += "background: -moz-linear-gradient(" + angle + "deg, " + stop_arr.join(", ") + ");/* FF3.6+ */\n";
        str += "background: -webkit-gradient(linear, " + angle + "deg, " + webkit_stop_arr.join(", ") + ");/* Chrome,Safari4+ */\n";
        str += "background: -webkit-linear-gradient(" + angle + "deg, " + stop_arr.join(", ") + ");/* Chrome10+,Safari5.1+ */\n";
        str += "background: -o-linear-gradient(" + angle + "deg, " + stop_arr.join(", ") + ");/* Opera 11.10+ */\n";
        str += "background: -ms-linear-gradient(" + angle + "deg, " + stop_arr.join(", ") + ");/* IE10+ */\n";
        str += "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='" + ieFrom + "', endColorstr='" + ieTo + "', GradientType='" + ieType + "'); /* for IE */\n";
        str += "background: linear-gradient(" + W3Cangle + "deg, " + stop_arr.join(", ") + ");/* W3C */"

        $scope.resultCode = str;



    }
});





