var u = navigator.userAgent;
var isWeixin = false;
var isAndroid = false;
var isIOS = false;

/**
 * 微信上传文件
 */
$("#file").change(function () {

    isWeixin = u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';  // 微信端

    if(isWeixin) {
        weixinUpload();
    }
});

/**
 * 手机app上传文件
 */
$("#file").click(function () {
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //安卓终端
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid || isIOS) {
        openMyCamera();
    }
});

function openMyCamera()
{
    if (isAndroid) {
        // 安卓端
        window.WebViewJavascriptBridge.callHandler(
            'openMyCamera'
            , '1'
            ,'100'//该类型是任意类型
            , function(responseData) {

            }
        );
    } else if(isIOS) {
        // 苹果端
        window.webkit.messageHandlers.openMyCamera.postMessage({"num":"1"});
    }

}

// 苹果端上传图片
function returnImageData(basedata) {
    appUpload(basedata);
};

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

/**
 * app上传的初始化执行
 *
 */
connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
        console.log('JS got a message', message);
        var data = {
            'json': 'JS返回任意数据!'
        };
        console.log('JS responding with', data);/*打印信息*/
        document.getElementById("init").innerHTML = "data = " + message;
        responseCallback(data);
    });

    bridge.registerHandler("returnImageData", function(basedata,code, responseCallback) {
        // 安卓端上传图片
        appUpload(basedata);

        responseCallback("success");
    });
});

/**
 * 微信上传图片的方法
 * @param basedata
 */
function weixinUpload() {
    var file = document.getElementById("file");
    // file域中有值的情况下,进行文件上传的操作
    if(file.files.length > 0) {
        var formData = new FormData();
        formData.append("headPhoto", file.files[0]);
        // 使用ajax上传文件
        $.ajax({
            url:conPathRecycle + "user/file",
            type:"post",
            data: formData,
            dataType:"json",
            contentType: false,
            processData: false,
            timeout:15000,
            success:function (data) {
                if(data.success) {
                    weixinImgChange('z_photo',"file");
                    $("#file").val("");
                    $("#licenseImage").val(data.content);
                    layer.alert("图片上传成功");
                }
            },
            error:function (data) {
                layer.alert("图片上传超时");
            }
        })
    }
}

/**
 * 安卓和ios上传图片的方法
 * @param basedata
 */
function appUpload(basedata) {
    $.ajax({
        type: "post",
        url: conPathRecycle + "user/file/base64",
        data: {
            "base64":basedata
        },
        dataType:"json",
        timeout:15000,
        cache: false,
        success: function(data){
            appImageChange('z_photo',basedata);
            $("#licenseImage").val(data.content);
            layer.alert("图片上传成功");
        },
        error:function (data) {
            layer.alert("图片上传超时");
        }
    });
}