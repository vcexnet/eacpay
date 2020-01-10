var walletName = localStorage.getItem("walletName");

//导出私钥
$(function() {
	showPerivateKey();
});

function showPerivateKey() {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "listaddressgroupings",
		"params": []
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path + walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json", //返回json格式的数据
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {
			// console.log(data.result);
			var dataList = data.result[0];
			var htmls ="";
			console.log(dataList[0]);
			if (dataList.length != 0) {
				for (var i = 0; i < dataList.length; i++) {
					htmls+='<li style="height: 34px; padding: 10px; border-bottom: 1px #e7e5e2 solid;"  class="asd">' + dataList[i][0] + '</li>'
				};
				$('#ul_li').append(htmls);

			}
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
}

function fuzhi(){
	var address=$("#lang_b").val();
	// console
	$("#copy").val(address);
}
function gerPivKey(address) {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "dumpprivkey",
		"params": [address]
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path + walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json", //返回json格式的数据
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {
			console.log(data.result);
			var dataList = data.result;

			$("#copy").val(dataList);


		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});

}
//复制私钥
function copyUrl() {
	var private_key = $("#copy").val();
	if (private_key) {
		var Url2 = document.getElementById("copy");
		Url2.select(); // 选择对象
		document.execCommand("Copy"); //执行浏览器复制命令用户定义的代码区域用户定义的代码区域
		mui.toast('复制成功');
	} else {
		mui.alert('请选择或者输入您的私钥', function() {


		});
	}

}
//导出私钥提示
function fakeClick(obj) {
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(ev);
	console.log(ev);
	mui.toast("私钥导出成功")
}

function exportRaw(name, data) {
	var urlObject = window.URL || window.webkitURL || window;
	var export_blob = new Blob([data]);
	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	save_link.href = urlObject.createObjectURL(export_blob);
	save_link.download = name;
	console.log("导出成功" + save_link);
	fakeClick(save_link);
};
//导出文本框的地址 
function exportFile() {
	var private_key = $("#copy").val();
	console.log($("#copy").val());
	if (private_key) {
		exportRaw('private_key.txt', private_key)
	} else {
		mui.alert('请选择您要导出的私钥', function() {


		});
	}

}

