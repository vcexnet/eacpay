
var walletName = localStorage.getItem("walletName");
var oneTime=localStorage.getItem("oneTime");
var oldName;
var file_content = [];


$(function() {
// Common.saveLocalData("walletName", "eVAr93C9FZQw4bMaXpU5hSK894WCwPdRBa");


		showTransactions();


});


//显示交易记录
function showTransactions() {

	var datadata = {
		"jsonrpc": "1.0",
		"method": "listtransactions",
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
			console.log(data.result);
			var dataList =data.result.sort(function(a,b){
        return a.time < b.time ? 1 : -1
    });;	
			// var dataList=[];
			// for(var i=0;i<dataLists.length;i++){
			
			// 	if(!dataLists[i].fee){
			// 			console.log("我看看");
			// 		dataList.push(dataLists[i]);
			// 	}
			// }
			var forTime=0;
			var htmls;
			if (dataList.length != 0) {
				if(dataList.length>3){ 
					forTime=3
				}else{
					forTime=dataList.length
				}
				for (var i = 0;i < dataList.length; i++) {
					htmls += '<tr style="border-bottom: #ccc solid 1px;" data-id="' + dataList[i].txid +'" id="showData">' +
						'<td  style="color: #1EB032;font-size: 1.2rem;">√</td>'

					if(dataList[i].amount>0){
						htmls += '<td style="text-align: left;font-size: 0.8rem;">收款自：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time*1000) +
							'</td>'
						htmls += '<td style="color: #1EB032;">' + dataList[i].amount + '</td></tr>'
						
						
					}else{
						htmls += '<td style="text-align: left;font-size: 0.8rem;">付款到：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time*1000) +
							'</td>'
						htmls += '<td style="color: red;">' + dataList[i].amount + '</td></tr>'
					}
					

				};

				$('#showDatas').append(htmls);
				$("#showDatas").on("click", "#showData", function(event) {
					console.log($(this))
					var txId = $(this)[0].dataset.id;

					showTransaction(txId);

					// alert(id);
				});
			}



		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});


}
//显示单条交易详情
function showTransaction(txId) {
	var datadata = {
		"jsonrpc": "1.0",
		"method": "gettransaction",
		"params": [txId]
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
			var walletInfo = data.result;
			$("#amount").val(walletInfo.amount + " Earthcoins");
			$("#confirmations").val(walletInfo.confirmations);
			$("#time").val(Common.formatDate(walletInfo.time*1000));
			$("#txid").val(walletInfo.txid);
			// $("#toaddress").val(walletInfo.amount);
			var lable="";
			if(walletInfo.details[0].label){
				lable=walletInfo.details[0].label
			}
			$("#toaddress").val(lable + "  " + walletInfo.details[0].address);
			$("#vout").val(walletInfo.details[0].vout);
			showDetails();
			// alert(data.result.walletversion);


		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});

}


function showDetails() {
	mui("#details").popover("toggle");
}

function closeDetails() {
	mui("#details").popover("hide");
}


