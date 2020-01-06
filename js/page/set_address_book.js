var walletName = localStorage.getItem("walletName");



$(function() {
	// sendToAddress(); 
	showAddress();
				document.getElementById("promptBtn").addEventListener('tap', function(e) {
					e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
					var btnArray = ['取消', '确定'];
					mui.prompt('请输入您地址的标签：', '', '提示', btnArray, function(e) {
						if (e.index == 1) {
							getNewAdress(e.value);
						console.log("点击确定"+ e.value);
						} else {
						console.log("点击取消"+ e.value);
							getNewAdress(e.value);
						}
					})
				});
});


// function sendToAddress() {

// 	var datadata = {
// 		"jsonrpc": "1.0",
// 		"method": "sendtoaddress",
// 		"params": ["ejtgcTUrrgZoqWJ1cLgcbV3oSy5o3nxH8n", 0.01,"这是一个测试转账交易"]
// 	};
// 	$.ajax({
// 		// 请求方式
// 		type: "post",
// 		contentType: "application/json",
// 		url: ChangeEnv.path+walletName,
// 		username: ChangeEnv.username,
// 		password: ChangeEnv.password,
// 		dataType: "json",
// 		crossDomain: true,
// 		jsonpCallback: "jsonpCallbackFun",
// 		jsonp: "callback",
// 		// 把JS的对象或数组序列化一个json 字符串
// 		async: false,
// 		data: JSON.stringify(datadata),
// 		success: function(data) {
// 			console.log(data.result);
			
// 		},
// 		error: function(jqXHR) {
// 			alert("发生错误：" + jqXHR.status);
// 		}
// 	});


// }


function getNewAdress(lable) {

	var datadata = {
		"jsonrpc": "1.0",
		"method": "getnewaddress",
		"params": [lable]
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path+walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json",
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {
			console.log(data.result);
		},
		error: function(jqXHR) {
			alert("发生错误：" + jqXHR.status);
		}
	});


}

function showAddress() {

	var datadata = {
		"jsonrpc": "1.0",
		"method": "listaddressgroupings",
		"params": []
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path+walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json",
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {

			var dataList = data.result[0];
			console.log(dataList);

			var htmls;
			var label;
			if(dataList.length!=0){

				for (var i = 0; i <dataList.length; i++) {
					
					if(dataList[i][2]){
						 label=dataList[i][2];
					}else{
						label="无";
					}
					htmls += '<tr style="border-bottom:#ccc solid 1px;" >'+
					'<td style="color: #1EB032;font-size: 16px; text-align:center;">'+label+'</td>'
					htmls += '<td style="text-align: left; font-size:13px;">' + dataList[i][0]+
						'</td>'
						htmls +='<td>'+'<button class="btnDelete" style="background-image: url(../images/del.png); width:1px; margin-top: 7px; border:none; color:#267EDD; background-repeat:no-repeat;">&nbsp;</button>'+'</td></tr>'
					
				
				};
			}
			
			//选择地址
			$("#choiceBtn").click(function(){
				$("#showDatas")
			});
			
							
			//删除地址			
			$("#removeBtn").click(function(){
				$("#showDatas").empty();
				
			});
			
			$("#showDatas").append(htmls);
		},
		error: function(jqXHR) {
			alert("发生错误：" + jqXHR.status);
		}
	});


}
function huoqu() {
    var datas = {
        "jsonrpc": "1.0",
        "method": "getnewaddress",
        "params": []
    };
    $.ajax({
        // 请求方式
        type: "post",
        contentType: "application/json",
        url: ChangeEnv.path+walletName,
        // username: ChangeEnv.username,
        // password: ChangeEnv.password,
        dataType: "json",
        crossDomain: true,
        jsonpCallback: "jsonpCallbackFun",
        jsonp: "callback",
        // 把JS的对象或数组序列化一个json 字符串
        async: false,
        data: JSON.stringify(datas),
        success: function(data) {
            console.log(data.result);
			var  adress =data.result;
			if(adress){
				showTiShi();
				$("#newAdress").val(adress);
				}else{
					mui.toast("网络繁忙,请稍后重试！", {
					    duration: 'short',
					    type: 'div'
					})
				}


        },
        error: function(jqXHR) {
            mui.toast("系统错误！", {
                duration: 'short',
                type: 'div'
            })
        }
    });
}

function showTiShi() {
	mui("#tiShi").popover("toggle");
}

function closeTiShi() {
	mui("#tiShi").popover("toggle");
}
//复制地址
function copyUrl() {
	var walletName = $("#newAdress").val();
	if(walletName){
		var Url = document.getElementById("newAdress");
		Url.select(); // 选择对象
		document.execCommand("Copy"); //执行浏览器复制命令用户定义的代码区域用户定义的代码区域
		mui.toast('复制成功');
	}else{

	}
	
}