//设置手续费率
var walletName = localStorage.getItem("walletName");
$(function() {


	showWallet();
	//自定义手续费率

	$("#determineBtn").click(function() {
		//获取自定义费率
		var free = $("#inputFee").val();
		if (free) {
			feeRate(free);
		} else {
			mui.alert("请输入费率")
			console.log('value222'+free)
		}
	});

	//恢复默认手续费率
	$("#recoveryBtn").click(function() {
		feeRate(0);
		mui.toast("已恢复默认费率");
	});
});
//当前手续费率
function feeRate(free) {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "settxfee",
		"params": [free],
	};
	$.ajax({
		//请求方式/
		type: "post",
		contenType: "application/json",
		url: ChangeEnv.path+walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json",
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		//把JS的对象或数组序列化一个jsonzifuc,	
		data: JSON.stringify(datadata),
		success: function(data) {
			console.log(data.result);
			if (data.result) {
				$("#currentFee").text(free);

				mui.alert("费率设置成功");
			}

		},


		error: function(jqXHR) {
			alert("发生错误：" + jqXHR.status);
		}
	});
}
//显示钱包详情
function showWallet() {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "getwalletinfo",
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
			if (data.result) {
				var datas = data.result;
				$("#currentFee").text(datas.paytxfee);
				// $("#inputFee").val(data.result.balance);
				// $("#walletName").val(walletName);
			}
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
}
