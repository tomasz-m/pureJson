
var standard_string = document.getElementById("std_string").value;
var standard_integrt = Number(document.getElementById("std_integer").value);
var standard_decimal = Number(document.getElementById("std_decimal").value);
var standard_boolean;
var standard_date = document.getElementById("std_date").value;


function isInt(n) {
    return n % 1 === 0;
}
function getStandarizedValue(value) {
    var type = typeof value;
    if (type == "string") {
        return standard_string;
    } else if (type == "number") {
        if (isInt(value)) {
            return standard_integrt;
        } else {
            return standard_decimal;
        }
    } else if (type == "boolean") {
        return standard_boolean;
    }
}


function processJSONData(thisData, outData, isArray) {
    var data = thisData;
    // var thisList = document.createElement("ul");
    for (var key in data) {
        if (data[ key ] != null) {
            var thisType = typeof data[ key ];
            if (thisType == "object") {
                var falseKey = key;
                if (isArray) {
                    falseKey = "0";
                }
                if (Object.prototype.toString.call(data[key]) === '[object Array]') {
                    outData[key] = [];
                    processJSONData(data[ key ], outData[key], true);
                } else {
                    if (outData[falseKey] == null)
                        outData[falseKey] = {};
                    processJSONData(data[ key ], outData[falseKey], false);
                }
            }
            else {
                if (!isArray || key == "0")
                    outData[key] = getStandarizedValue(data[key]);
            }
        }
    }
}


function generate() {
    standard_string = document.getElementById("std_string").value;
    standard_integrt = Number(document.getElementById("std_integer").value);
    standard_decimal = Number(document.getElementById("std_decimal").value);
    standard_boolean = document.getElementById("std_boolean").checked;
    standard_date = document.getElementById("std_date").value;


    str = document.getElementById("inputArea").value;
    if (str.length == 0) {
        document.getElementById("resultArea").value = "";
        return;
    } else {
        try {
//            var outObject = {};
            var jsonObject = JSON.parse(str);
//            processJSONData(jsonObject, outObject, false);
            if (Object.prototype.toString.call(jsonObject) === '[object Array]') {
                var outObject = [];
                processJSONData(jsonObject, outObject, true);
            }else{
                var outObject = {};
                processJSONData(jsonObject, outObject, false);
            }
        } catch (e) {
            alert(e);
        }

        document.getElementById("resultArea").value = JSON.stringify(outObject, null, 2);
        //eval('(' + document.getElementById("inputArea").value + ')'
        // JSON.parse(str)
        //, null, 2);
    }
}
