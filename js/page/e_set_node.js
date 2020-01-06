//设置手续费率
var walletName = localStorage.getItem("walletName");
$(function() {


	showNode();
	//自定义手续费率

});
//当前手续费率
function showNode() {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "getblockchaininfo",
		"params": [],
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
				$("#node_hight").text(data.result.headers);
				$("#block_hight").text(data.result.blocks);


			}

		},


		error: function(jqXHR) {
			alert("发生错误：" + jqXHR.status);
		}
	});
}

