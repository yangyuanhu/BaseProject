//文件上传路径
var uploadPath = 'https://shop.ankin.cn//base/testfile.jsp';

// 文件路径
var paths = 'https://shop.ankin.cn///files/';
var paramterUserId = urlParamter();

//参数
var conPath = getContextPath();
//用于图片前加的参数
var conPath1 = getContextPath()+"/";

var conPathshopshow = getContextPath()+"/shopshow/";

var conPathRecycle = getContextPath() + "/";


//获取图片后面的地址
function imgConpath(img) {
    var index = img .lastIndexOf("/shopshow");
    img  = img .substring(index + 1, img .length);
    return img;
}


//获取项目根路径
function getContextPath(){
    var str = location.href; //取得整个地址栏
    var pathName = document.location.pathname;     //当前文件的绝度路径
    var index = str.indexOf(pathName);
    var result = str.substr(0,index);
    return result;
}

function postSend(url, parameter) {
    var encodeUrlNew  = url+parameter;
    var remember = null;
    $.ajax({
        type: "post",
        url: encodeUrlNew,
        dataType: "json",
        async: false,
        success: function (data) {
            // isLogin()
            if (data.success) {
                remember = data.content
            } else {
                newAlert(data.error)
                return;
            }
        },
        error: function (data) {
            newAlert(data.responseText.replace(/\r\n/g,""))
            return;
        }
    });
    return remember;
}


function GetSend(url, parameter) {
    var encodeUrlNew  = url+parameter;
    var remember = null;
    $.ajax({
        type: "get",
        url: encodeUrlNew,
        dataType: "json",
        async: false,
        success: function (data) {
            // isLogin()
            if (data.success) {
                remember = data.content
            } else {
                newAlert(data.error)
                return;
            }
        },
        error: function (data) {
            newAlert(data.responseText.replace(/\r\n/g,""))
            return;
        }
    });
    return remember;
}


//跳转页面
function skp(e) {
    if("home" == e){
        window.location.href = 'index.html'+paramterUserId;
    }else if("type"== e){
        window.location.href = 'category.html'+paramterUserId;
    }else if("about" == e){
        window.location.href = 'about.html'+paramterUserId;
    }else if("mine" == e){
        window.location.href = 'mine.html'+paramterUserId;
    }
}


//取得地址参数(包括?)
function urlParamter() {
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num); //取得所有参数   stringvar.substr(start [, length ]
    if (str == null || str == undefined || str == "") {
        newAlert("系统获取信息信息失败？原因并没有发现店长id")
    }
    return str;
}


//截取userId
function urlUserId() {
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("userId=")
    str = str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    if (str == null || str == undefined || str == "") {
        newAlert("系统获取信息信息失败？原因并没有发现店长id")
    }
    return str;
}

//取得相对目录
function path() {
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("goodsList.html")
    str = str.substr(0, num); //取得所有参数   stringvar.substr(start [, length ]
    return str;
}

//判断价格
function isPriceNumber(_keyword){
    if(_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00"){
        _keyword = "0"; return true;
    }else{
        var index = _keyword.indexOf("0");
        var length = _keyword.length;
        if(index == 0 && length>1){/*0开头的数字串*/
            var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
            if(!reg.test(_keyword)){
                return false;
            }else{
                return true;
            }
        }else{/*非0开头的数字*/
            var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
            if(!reg.test(_keyword)){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }



}

function newAlert(e) {
    var message = "<p style='font-size: 14px;line-height: 1.42857143'>"+e+"</p>";

    alertify.alert(message);
};



function newConfirm(i) {
    var message = "<p style='font-size: 14px;line-height: 1.42857143'>"+i+"</p>";

    alertify.confirm(message, function (e) {
        if(e) {
            alertify.success("You clicked <strong>确定</strong>");
        } else {
            alertify.error("You clicked <strong>取消</strong>");
        }
    });
}

function newPrompt(i,r) {
    var message = "<p style='font-size: 14px;line-height: 1.42857143'>"+i+"</p>";

    alertify.prompt(message, function (e, str) {
        if(e) {
            alertify.success("You typed <strong>"+str+"</strong>");
        } else {
            alertify.error("You clicked <strong>Cancel</strong>");
        }
    }, r);
}

// 以下JS函数用于获取url参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return "";
}
function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

// 获取当前时间 yyyy-MM-dd HH:mm:ss
function showTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if(month < 10) {
        month = "0" + month;
    }
    var day = date.getDate().toString();
    if(day < 10) {
        day = "0" + day;
    }
    var hour = date.getHours();
    if(hour < 10) {
        hour = "0" + hour;
    }
    var minute = date.getMinutes();
    if(minute < 10) {
        minute = "0" + minute;
    }
    var second = date.getSeconds();
    if(second < 10) {
        second = "0" + second;
    }
    var result =
        year + "-" + month + "-" + day + " " + hour + ":"
        + minute + ":" + second;
    return result;
}

// 将时间戳转换成时间 yyyy-MM-dd HH:mm:ss
function showStampTime(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if(month < 10) {
        month = "0" + month;
    }
    var day = date.getDate().toString();
    if(day < 10) {
        day = "0" + day;
    }
    var hour = date.getHours();
    if(hour < 10) {
        hour = "0" + hour;
    }
    var minute = date.getMinutes();
    if(minute < 10) {
        minute = "0" + minute;
    }
    var second = date.getSeconds();
    if(second < 10) {
        second = "0" + second;
    }
    var result =
        year + "-" + month + "-" + day + " " + hour + ":"
        + minute + ":" + second;
    return result;
}
// 将时间戳转换成时间 yyyy-MM-dd
function showStampTime2(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if(month < 10) {
        month = "0" + month;
    }
    var day = date.getDate().toString();
    if(day < 10) {
        day = "0" + day;
    }

    var result =
        year + "-" + month + "-" + day
    return result;
}



/**
 * 保留两位小数
 * @param obj
 */
function decimalFormatTwo(obj){
    obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}

/**
 * 保留三位小数(只能是正数)
 * @param obj
 */
function decimalFormatThree(obj){
    obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}


/**
 * 保留三位小数(可以是负数)
 * @param obj
 */
function decimalFormatThreeWithNegative(obj){
    obj.value = obj.value.replace(/[^\d.-]/g,""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj.value = obj.value.replace(/\-{2,}/g,"-"); //只保留第一个, 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}

function qx() {
    var gb = parent.layer.getFrameIndex(window.name);
    parent.layer.close(gb);
}
function reload(){
    location.reload();
}
//手机号码验证
function checkMobile(str) {
    var re = /^1\d{10}$/
    if (!re.test(str)) {
        alert("手机号码格式错误");
        return false;
    }
    return true;
}

function operationNumber(arg1,arg2,operator) {
    var oper=['+','-','*','/'];
    // 不合法的运算
    if (isNaN(arg1)||isNaN(arg2)||oper.indexOf(operator)<0) {
        return NaN;
    }
    // 除以0
    if (operator==='/'&&Number(arg2)===0) {
        return Infinity;
    }
    // 和0相乘
    if (operator==='*'&&Number(arg2)===0) {
        return 0;
    }
    // 相等两个数字相减
    if ((arg1===arg2||Number(arg1)===Number(arg2))&&operator==='-') {
        return 0;
    }
    var r1, r2, max,_r1,_r2;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    max = Math.max(r1, r2)
    _r1 = max-r1;
    _r2 = max-r2;
    if (_r1!==0) {
        arg1=arg1+'0'.repeat(_r1)
    }
    if (_r2!==0) {
        arg2=arg2+'0'.repeat(_r2)
    }
    arg1 = Number(arg1.toString().replace('.',''))
    arg2 = Number(arg2.toString().replace('.',''))
    var r3 = operator==='*'?(max*2):(operator==='/'?0:max);
    if(arg2<0){
        var newNum = eval(arg1+operator+"("+arg2+")");
    }else{
        var newNum = eval(arg1+operator+arg2);
    }


    if (r3!==0) {
        var nStr = newNum.toString();
        nStr = nStr.replace(/^-/,'');
        if (nStr.length<r3+1) {
            nStr = '0'.repeat(r3+1-nStr.length)+nStr;
        }
        nStr = nStr.replace(new RegExp('(\\\d{'+r3+'})$'),'.$1');
        if (newNum<0) {
            nStr = '-'+nStr;
        }
        newNum = nStr*1;
    }
    return newNum;
}
//加法
Number.prototype.myAdd = function(arg2) {
    return operationNumber(this,arg2,'+');
}
//减法
Number.prototype.mySub = function(arg2) {
    return operationNumber(this,arg2,'-');
}
//乘法
Number.prototype.myMul = function(arg2) {
    return operationNumber(this,arg2,'*');
}
// 除法
Number.prototype.myDiv = function(arg2) {
    return operationNumber(this,arg2,'/');
}

function getDate(){

    var myDate = new Date();

    //获取当前年
    var year = myDate.getFullYear();

    //获取当前月
    var month = myDate.getMonth() + 1;

    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    //获取当前时间

    var now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
    return now
}

//日期时间处理
function conver(s) {
    return s < 10 ? '0' + s : s;
}

function formatNumber (num) {
    if (isNaN(num)) {
        return 0;
    } else {
        var index = (num + "").indexOf('.');
        if (index >= 0) {
            var arr = (num + "").split('.');
            if (arr.length > 1) {
                if (arr[1].length >= 2) {
                    if (arr[1].charAt(0) == '0' && arr[1].charAt(1) == '0')
                        return arr[0];
                    else if (arr[1].charAt(0) == '0' && arr[1].charAt(1) != '0')
                        return arr[0] + "." + arr[1].charAt(0) + arr[1].charAt(1);
                    else if (arr[1].charAt(0) != '0' && arr[1].charAt(1) == '0')
                        return arr[0] + "." + arr[1].charAt(0);
                    else
                        return arr[0] + "." + arr[1].charAt(0) + arr[1].charAt(1);
                } else {
                    if (arr[1].charAt(0) == '0')
                        return arr[0];
                    else
                        return arr[0] + "." + arr[1].charAt(0);
                }
            } else {
                return arr[0];
            }
        } else {
            return num;
        }

    }
}
//时间戳转时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

function bl2(number){
    return Math.round(number*100)/100.0
}
function bl7(number) {
    return Math.round(number * 10000000) / 10000000.0
}
function updateCSE2(obj,item){

    if(item.notaxMoney!=obj.data.notaxMoney){
        item.notaxMoney=obj.data.notaxMoney
    }else{
        item.notaxMoney=bl2((item.applyprice*item.applyquantity).myDiv(1+item.taxrate/100)).toFixed(2);
    }

    item.notaxPrice=bl7(((item.applyprice*item.applyquantity).myDiv(1+item.taxrate/100)).myDiv(item.applyquantity))
}
function updateCSE5(obj,item){

    if(item.moneyNotax!=obj.data.moneyNotax){
        item.moneyNotax=obj.data.moneyNotax
    }else{
        item.moneyNotax=bl2((item.price*item.haveCount).myDiv(1+item.taxrate/100)).toFixed(2);
    }

    item.notaxPrice=bl7(((item.price*item.haveCount).myDiv(1+item.taxrate/100)).myDiv(item.haveCount))
}
function updateCSE1(obj,item){

    if(item.cse!=obj.data.cse){
        item.cse=obj.data.cse
    }else{
        item.cse=bl2((item.sqsl*item.sqdj).myDiv(1+item.sl/100)).toFixed(2);
    }

    item.csdj=bl7(((item.sqsl*item.sqdj).myDiv(1+item.sl/100)).myDiv(item.sqsl))
}
function checkUpdate(this1,obj,item){
    if (isNaN(obj.data.sqsl) || obj.data.sqsl < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    if (isNaN(obj.data.sqdj) || obj.data.sqdj < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    if(item.shrq!=obj.data.shrq){
        var reg =/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if(!reg.test(obj.data.shrq)){
            $(this1).val(layui.$(this1).prev().text());
            layer.alert("收货日期格式不正确，格式为YYYY-MM-DD")
            return false
        }
        // item.shrq=obj.data.shrq
    }
    return true

}
function checkUpdate2(this1,obj,item){
    if (isNaN(obj.data.applyquantity) || obj.data.applyquantity < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    return true
}function checkUpdate3(this1,obj,item){
    if (isNaN(obj.data.quantity) || obj.data.quantity < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    return true
}
function checkUpdate4(this1,obj,item){
    if (isNaN(obj.data.thsl) || obj.data.thsl < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    if (isNaN(obj.data.thdj) || obj.data.thdj < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    if (obj.data.thsl > obj.data.totalQuantity) {
        layer.alert("退货数量不能超过个人库存！");
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    return true

}

function checkUpdate8(this1,obj,item){
    if (isNaN(obj.data.haveCount) || obj.data.haveCount < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    return true
}
function checkUpdate9(this1,obj,item){
    if (isNaN(obj.data.quantity) || obj.data.quantity < 0) {
        $(this1).val(layui.$(this1).prev().text());
        return false
    }
    return true
}
function updateCSE2(obj,item){

    if(item.cse!=obj.data.cse){
        item.cse=obj.data.cse
    }else{
        item.cse=bl2((item.thsl*item.thdj).myDiv(1+item.sl/100)).toFixed(2);
    }

    item.csdj=bl7(((item.thsl*item.thdj).myDiv(1+item.sl/100)).myDiv(item.thsl))
}