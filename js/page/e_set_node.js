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


function addNode(){
	var nodeIp= $("#node_ip").val();
	var nodePort= $("#node_port").val();
	var act= $("#act").val();
	var pwd= $("#pwd").val();
	var writeContent;
	var datadata = {
		"jsonrpc": "1.0",
		"method": "createwallet",
		"params": [name]
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: nodeIp+":"+nodePort+"/wallet/" + name,
		username: act,
		password: pwd,
		dataType: "json",
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {
			console.log(data);
	
			if (data.result) {
				// Common.saveLocalData("walletName", name);


			}
			
	
	
		},
		error: function(jqXHR) {
			mui.alert('该名字已存在,请重新填写', function() {
				console.log(jqXHR.status);
			});
	
		}
	});
	
	
	

	
	
	writeContent=nodeIp+":"+nodePort+"/wallet/~"+act+"~"+pwd+"|"
	
	console.log(writeContent);
}





 // setTimeout(function(){  
	//  FileUtil.readFile("EAC/nodeBook");
	//   }, 200);