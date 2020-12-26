// var userInfo = localStorage.getItem("user");
var walletName = localStorage.getItem("walletName");
var oneTime=localStorage.getItem("oneTime");
var oldName;
var file_content = [];




$(function() {

	if (!walletName) {
		$("#changeFile").css("display", "block");
		showInputWalletName();
	} else {
		if(oneTime==0){
			$("#walletName").val(walletName);
			showInputWalletName();
		}

	}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	showWallet();
	showTransactions();
	showDTransactions();
});
//读取文件值
function handleFileSelect(evt) {
	var file = evt.target.files[0]; // FileList object
	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			file_content.push(e.target.result);
		};
	})(file);

	reader.onloadend = function() {
		var str = file_content[0];
		$file_list = str.split(/\s+/);

		oldName = $file_list;
		console.log($file_list);
	};
	reader.readAsText(file);
}
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
		url: ChangeEnv.path,
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
			var dataList = data.result;
			var htmls;
			if (dataList.length != 0) {
				for (var i = 0; i < 2; i++) {
					htmls += '<tr >' +
						'<td data-id="' + dataList[i].txid +
						'" style="color: #1EB032;font-size: 1.2rem;"><input type="button" class="show" value="√"/></td>'
					htmls += '<td style="text-align: left;">收款自：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time) +
						'</td>'
					htmls += '<td style="color: #1EB032;">' + dataList[i].amount + '</td></tr>'

				};

				$('#showDatas').append(htmls);
				$("#showDatas").on("click", ".show", function(event) {
					var txId = $(this).parent().data("id");

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
		url: ChangeEnv.path + walletName,
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
			$("#confirmations").val(walletInfo.confirmations + " 个确认");
			$("#time").val(Common.formatDate(walletInfo.time));
			$("#txid").val(walletInfo.txid);
			// $("#toAdress").val(walletInfo.amount);
			$("#toAdress").val(walletInfo.details[0].label + "  " + walletInfo.details[0].address);
			$("#vout").val(walletInfo.details[0].vout);
			showDetails();
			// alert(data.result.walletversion);


		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});

}
//检查钱包名字是否存在
function checkWallet(name) {

	var datadata = {
		"jsonrpc": "1.0",
		"method": "getwalletinfo",
		"params": []
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path + name,
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
			console.log(data);


			Common.saveLocalData("walletName", walletName);


		},
		error: function(jqXHR) {
			mui.alert('该名字不存在,请重新填写', function() {
				console.log(jqXHR);
			});

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
		url: ChangeEnv.path+ walletName,
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

				$("#isBalance").val(datas.balance);
				$("#balance").val(datas.balance);
				$("#unconfirmed_balance").val(datas.unconfirmed_balance);
			}
			// alert(data.result.walletversion);


		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
}
// 显示交易所信息
function showDTransactions() {
	$.ajax({
		url: "https://api.aex.zone/v3/ticker.php",

		// url: "https://api.aex.zone/ticker.php",
		method: "post",
		data: {
			"mk_type": "cnc",
			"coinname": "all"
		},
		success: function(datas) {
			console.log(datas.data);
			var dataList = datas.data;
			var htmls;

			htmls += "<tr> <td style='color: #1EB032;font-size: 1.2rem;'>ae</td>"
			htmls += "<td style='text-align: center;'>AE/CNC</td>"
			htmls += "<td style='text-align: center;'>" + dataList.ae.buy + "</td>",
				htmls += "<td style='color: #1EB032;'>" + dataList.ae.range + "</td></tr>"

			htmls += "<tr> <td style='color: #1EB032;font-size: 1.2rem;'>btc</td>"
			htmls += "<td style='text-align: center;'>BTC/CNC</td>"
			htmls += "<td style='text-align: center;'>" + dataList.btc.buy + "</td>",
				htmls += "<td style='color: #1EB032;'>" + dataList.btc.range + "</td></tr>"


			$('#showExchanges').append(htmls);

			for (var i = 0; i < dataList.length - 1; i++) {
				console.log(dataList);

			}
			// $.each(dataList, function(i, d) {
			// 	console.log(d);


			// });
		},
		dataType: 'json'
	});

}

function showDetails() {
	mui("#details").popover("toggle");
}

function closeDetails() {
	mui("#details").popover("hide");
}

function showInputWalletName() {
	mui("#inputWalletName").popover("toggle");
}

function closeInputWalletName() {
	mui("#inputWalletName").popover("toggle");
}

function confirmName() {


	var oldWalletName = $("#walletName").val();
	var reg = new RegExp("^[0-9a-zA-Z_]{1,}$");
	if (!walletName) {
		//oldWalletName: input输入的值
		if (oldWalletName) {

			if (!reg.test(oldWalletName)) {
				mui.toast('只可输入数字和英文字母');
			} else {
				mui.toast('正在查找钱包');
				checkWallet(oldWalletName);
			};
			//oldName: 文件读取的值
		} else if (oldName) {
			if (!reg.test(oldName)) {
				mui.toast('只可输入数字和英文字母');
			} else {
				mui.toast('正在查找钱包');
				checkWallet(oldName);
			};
		}

	} else {
		Common.saveLocalData("oneTime", 1);
		closeInputWalletName();
	}
}


