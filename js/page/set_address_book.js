var walletName = localStorage.getItem("walletName");
var paymentaddressData="";


$(function() {

	// showAddress();

	
	setTimeout(function(){FileUtil.readFile("EAC/paymentAddress"); }, 200);
		
	setTimeout(function(){showPaymentaddress(); }, 500);
	
	
	
	
	
	
				document.getElementById("promptBtn").addEventListener('tap', function(e) {
					e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
					var btnArray = ['取消', '确定'];
					mui.prompt('请输入您地址的标签：', '', '提示', btnArray, function(e) {
						if (e.index == 1) {
							getNewaddress(e.value);
						console.log("点击确定"+ e.value);
						} else {
						console.log("点击取消"+ e.value);
						mui.toast("取消新建");
							// getNewaddress(e.value);
						}
					})
				});
});





function getNewaddress(lable) {

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
			$("#lable_1").val(lable);
			$("#address_1").val(data.result);
			showTiShi();
			
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
					htmls += '<tr style="border-top: solid #ccc 1px;" >'+
					'<td style="color: #1EB032;">'+label+'</td>';
					htmls += '<td id="address" style="text-align: left;">' + dataList[i][0]+'</td>';
					htmls +='<td data-id="'+dataList[i][0]+'" class="toSend" >付款</td></tr>'
					
				
				};
			}

		$("#showDatas").append(htmls);
		
		
		
		
			$(".toSend").click(function() {

					var address=	$(this)[0].dataset.id;
					window.location.href="send.html?address="+address;
					console.log(address);			
			 });
			
			
			//选择地址
			$("#choiceBtn").click(function(){
				// $("#showDatas")
			});
			
							
			//删除地址			
			$("#removeBtn").click(function(){
				$("#showDatas").remove();
				
			});
			
	
		},
		error: function(jqXHR) {
			alert("发生错误：" + jqXHR.status);
		}
	});


}
function showPaymentaddress(){
	paymentaddressData=FileUtil.readContent;
	var paymentaddressDatas=paymentaddressData.split('|');
	var paymentaddressDataNext='';
	var htmls="";
	for(var i=0;i<paymentaddressDatas.length-1;i++){
		paymentaddressDataNext=paymentaddressDatas[i].split(',');

		htmls+='<tr style="border-top: solid #ccc 1px;">';
		htmls+= '<td>'+paymentaddressDataNext[1].split(":")[1]+'</td>';
		htmls+= '<td>'+paymentaddressDataNext[0].split(":")[1]+'</td>';
		htmls +='<td style="color: #1EB032;" data-id="'+paymentaddressDataNext[0].split(":")[1]+'" class="toSend" >付款</td></tr>'

		
	} 
		$("#showDatas").append(htmls);
		
		$(".toSend").click(function() {
		
				var address=	$(this)[0].dataset.id;
				window.location.href="send.html?address="+address;
				console.log(address);			
		 });
		 
		 //删除地址
		 $("#removeBtn").click(function(){
		 	$("#showDatas").empty();
		 	
		 });
		
	// alert(paymentaddressData);
}
			//付款地址
			// function jump() {
			//   var s = document.getElementsById('#address')[0];
			//   location.href='send.html'+'value=' + encodeURI(s.value);
			// }


function showTiShi() {
	mui("#tiShi").popover("toggle");
}

function closeTiShi() {
	mui("#tiShi").popover("toggle");
}
//复制地址
function copyUrl() {
	var walletName = $("#newaddress").val();
	if(walletName){
		var Url = document.getElementById("newaddress");
		Url.select(); // 选择对象
		document.execCommand("Copy"); //执行浏览器复制命令用户定义的代码区域用户定义的代码区域
		mui.toast('复制成功');
	}else{

	}
	
}