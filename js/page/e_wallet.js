
var walletName = localStorage.getItem("walletName");
var oneTime=localStorage.getItem("oneTime");
var oldName;
var file_content = [];
var price;

$(function() {
// Common.saveLocalData("walletName", "eVAr93C9FZQw4bMaXpU5hSK894WCwPdRBa");
	showEAC();



	if (walletName) {

		showTransactions();
		showDTransactions();
		if(oneTime==0){
			$("#walletName").val(walletName);
			showInputWalletName();
		}

	} else {
		$("#changeFile").css("display", "block");
		showInputWalletName();


	}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	document.addEventListener("plusready", function() {}, false);

});


					// var data={"adress":"adress","newLable":"newLable","amount":"amount"};
					// console.log(data.adress);
			function scaned(t, r, f) {
				console.log("t:" + t + "r:" + r + "f:" + f);
				var data= Common.codeResolver(r);
							console.log(data);
				window.location.href="send.html?data="+data;
							
			}


			// 打开二维码扫描界面 
			function openBarcode() {
				createWithoutTitle('barcode_scan.html', {
					titleNView: {
						type: 'float',
						backgroundColor: 'rgba(215,75,40,0.3)',
						titleText: '扫一扫',
						titleColor: '#FFFFFF',
						autoBackButton: true,
						buttons: [{
							fontSrc: '_www/helloh5.ttf',
							text: '\ue302',
							fontSize: '18px',
							onclick: 'javascript:scanPicture()'
						}]
					}
				});
			}
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
		$("#walletName").val(oldName);
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
			var dataList = data.result;
			var forTime=0;
			var htmls;
			if (dataList.length != 0) {
				if(dataList.length>3){
					forTime=3
				}else{
					forTime=dataList.length
				}
				for (var i = 0; i < forTime; i++) {
					htmls += '<tr data-id="' + dataList[i].txid +'" id="showData">' +
						'<td  style="color: #1EB032;font-size: 1.2rem;"><input type="button" class="show" value="√"/></td>'
					console.log(i);
					if(dataList[i].amount>0){
						htmls += '<td style="text-align: left;">收款自：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time*1000) +
							'</td>'
						htmls += '<td style="color: #1EB032;">' + dataList[i].amount + '</td></tr>'
						
					}else{
						htmls += '<td style="text-align: left;">付款到：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time*1000) +
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
		url: ChangeEnv.path+name,
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

			if (data.result) {
				Common.saveLocalData("walletName", name);
				closeInputWalletName();
			}
			


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
				// $("#isBalance").val(datas.balance);
				// $("#balance").val(datas.balance);
				// $("#unconfirmed_balance").val(datas.unconfirmed_balance);
				
				/* 可使用余额 */
			var a=document.getElementById("isBalance").value=datas.balance;
				/* 待确认余额 */
			var b=document.getElementById("unconfirmed_balance").value=datas.unconfirmed_balance;
				/* 总额 */
			var c=document.getElementById("balance").value=a + b;
				/* 资产 */
			var d=document.getElementById("assets").value="≈¥"+(c*price).toFixed(8);
			console.log(c+"+++++++++++"+price);
			}
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
			console.log(datas);
			var dataList = datas.data;
			var htmls;
			var arr=[];
			var i=0;
			if(dataList.length!=0){
            for(let item in dataList ){
				// console.log(item);
				arr.push(dataList[item]);
				++i;
				if(i<=3){
				htmls += "<tr> <td style='color: #1EB032;font-size: 1rem;'>"+item.toUpperCase()+"</td>"
				htmls += "<td style='text-align: center;'>"+item.toUpperCase()+"/CNC</td>"
				htmls += "<td style='text-align: center;'>" + dataList[item].ticker.buy + "</td>",
				htmls += "<td style='color: #1EB032;'>" + dataList[item].ticker.range + "</td></tr>"
				}
				}
				}
			// htmls += "<tr> <td style='color: #1EB032;font-size: 1.2rem;'>ae</td>"
			// htmls += "<td style='text-align: center;'>AE/CNC</td>"
			// htmls += "<td style='text-align: center;'>" + dataList.ae.ticker.buy + "</td>",
			// htmls += "<td style='color: #1EB032;'>" + dataList.ae.ticker.range + "</td></tr>"

			// htmls += "<tr> <td style='color: #1EB032;font-size: 1.2rem;'>btc</td>"
			// htmls += "<td style='text-align: center;'>BTC/CNC</td>"
			// htmls += "<td style='text-align: center;'>" + dataList.btc.ticker.buy + "</td>",
			// 	htmls += "<td style='color: #1EB032;'>" + dataList.btc.ticker.range + "</td></tr>"


			$('#showExchanges').append(htmls);

			// for (var i = 0; i < dataList.length - 1; i++) {
			// 	console.log(dataList[i]);

			// }

		},
		dataType: 'json'
	});

}
function showEAC() {
	$.ajax({
		url: "https://api.aex.zone/v3/trades.php",
		method: "post",
		data: {
			"mk_type": "cnc",
			"coinname": "eac"
		},
		success: function(datas) {

			var dataList = datas.data;
					console.log(dataList[0].price);
					price=dataList[0].price;
						showWallet();
			// $("#eacMoney").text(dataList[0].price);
			
			//var e=document.getElementById("eacNumebr").textContent=dataList[0].price;
			
			// var e=$("#eacNumebr").text(dataList[0].price);

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


//复制私钥
function copyUrl() {
	var walletName = $("#walletName").val();
	if(walletName){
		var Url = document.getElementById("walletName");
		Url.select(); // 选择对象
		document.execCommand("Copy"); //执行浏览器复制命令用户定义的代码区域用户定义的代码区域
		mui.toast('复制成功');
	}else{
		mui.alert('请选择或者输入您的私钥', function() {
		
		
		});
	}
	
}