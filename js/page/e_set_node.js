//设置手续费率
var walletName = localStorage.getItem("walletName");
var nodeData='';
$(function() {


	showNode();
	
 // setTimeout(function(){  
	//  FileUtil.readFile("EAC/nodeBook");
	//   }, 200);
	
	setTimeout(function(){
		 FileUtil.readFile("EAC/nodeBook");
		  }, 400);
		  
	setTimeout(function(){showNodeList(); }, 500);

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
	if(!nodeIp || !nodePort || !act || !pwd){
		mui.alert('请将数据填写完整', function() {
			
		});
	}else{
		// alert("不走这里");
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
					// writeContent=nodeIp+":"+nodePort+"/wallet/~"+act+"~"+pwd+"|";
					// FileUtil.writeFile("EAC/nodeBook",writeContent);
					// Common.saveLocalData("walletName", name);
		
				}
				
		
		
			},
			error: function(jqXHR) {
				var erro;
				var erro1;
				if(jqXHR.statusText.split(":")[2]){
					erro=jqXHR.statusText.split(":")[2];
					}
				if(jqXHR.responseJSON){
					erro1=jqXHR.responseJSON.error.message;
					}
				 
				// console.log(jqXHR.responseJSON.error.message);
				// console.log(erro);
				if(erro==' Invalid URL'){
					mui.alert('该地址无效,请重新填写', function() {
						
					});
				}
				if(erro1=='Wallet  already exists.'){
					mui.alert('该节点已经存在,请不要重复添加', function() {

					});
				}
		
			}
		});

	}


	
	
	

	
	

	console.log(writeContent);
}

function showNodeList(){
	nodeData=FileUtil.readContent;
	var nodeDatas=nodeData.split('|');
	// console.log(nodeDatas[0]);
	var nodeText='';
	var htmls="";
	for(var i=0;i<nodeDatas.length-1;i++){
		nodeText=nodeDatas[i].split('~')[0].split("/wallet")[0];
		console.log(nodeDatas[i].split('~')[0]);
		htmls+='<li style="height: 34px; padding: 10px; border-bottom: 1px #e7e5e2 solid;" class="asd">'+nodeText+'</li>';
	} 
		$("#showList").append(htmls);
		
		
		$("#lang_b").click(function(){
				if("block" == $("#huangbiao_b").css("display")){
					hideLi_b();
				}else{
					showLi_b();
				}
			});
			
			$(".asd").each(function(i,v){
				$(this).click(function(){
					$("#lang_b").val($(this).html());
					hideLi_b();
				});
			});
			
			$("#lang_b").blur(function(){
				setTimeout(hideLi_b,200);
			});
			
		
		// $(".toSend").click(function() {
		
		// 		var address=	$(this)[0].dataset.id;
		// 		window.location.href="send.html?address="+address;
		// 		console.log(address);			
		//  });
		 


}

			function showLi_b(){
				$("#huangbiao_b").show();
			}
			function hideLi_b(){
				$("#huangbiao_b").hide();
			}

 // setTimeout(function(){  
	//  FileUtil.readFile("EAC/nodeBook");
	//   }, 200);