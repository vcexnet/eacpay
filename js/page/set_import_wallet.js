var walletName = localStorage.getItem("walletName");
//导入私钥
$(function() {
	// ImportSecretKey();
});
	

function ImportSecretKey() {
	var myKey=$("#myKey").val();
	console.log(myKey);
	
	var datadata = {
		"jsonrpc": "1.0",
		"method": "importprivkey",
		"params": [myKey, "testing", false] 
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

			
		
					// alert(id);

			
		
		
		
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}

	});
	$("#cancle1").click(function() {
		var text1;  // 全局变量用于保存文本框的内容	
		$("#text1").val('');
		mui.toast('取消成功')
	});
	
	$("#import1").click(function() {
		mui.alert("私钥导入成功")
	});
	
	$("#img1").click(function(){
		$("text1").file
	});
	
	

}
