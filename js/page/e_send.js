
var walletName = localStorage.getItem("walletName");
var url = JSON.stringify(ChangeEnv.getRequest());
var amountMoney;
var i=4;
var timehwnd;
var isWrite=0;
//付款
$(function() {

		setTimeout(function(){FileUtil.readFile("EAC/paymentAddress"); },400); 
		
		if (url) {
			if (url.split(":")[1]) {


				if (url.split(":")[0] == '{"address"') {
					// console.log(url.split(':"')[1].split('"}')[0]);
					var address = url.split(':"')[1].split('"}')[0];
					$("input[name=address]").val(address);
					isWrite=1;
				} else {
					var newData = url.split(":")[1]
					var address = newData.split(",")[0].replace('"', '');
					var amount = newData.split(",")[1];
					var newLable = decodeURIComponent(newData.split(",")[2].replace('"}', ''));
					console.log(newData + "++++++++" + newLable);

					if (amount != 0) {
						$("input[name=mony]").val(amount);
					}
					if (newLable != 0) {
						$("input[name=biaoQ]").val(newLable);

					}
					if (address) {
						$("input[name=address]").val(address);
					}
				}


			}
		}

		showTransactions();
		showWallet();
	});

	//判断付款地址是否为空
	function my_sendBtn() {
		//获取表单对象
		var address = $("#my_address").val();
		var amount = $("#my_amount").val();
		console.log(address);
		//验证项目是否为空
		if (!address) {
			mui.alert("请填写对方地址!", function() {

			});
			return;
		}
		if (!amount) {
			mui.alert("请填写付款金额", function() {

			});
			return;
		}


		var label = $("#my_label").val();
		var cost = $("#my_costInput").val();
		$("#newaddress").val(address);
		$("#money_1").val(amount);
		$("#label_1").val(label);
		$("#cost_1").val(cost);

				showTiShi();

		

	};





	
//转账
		
	function sendTo(){
		var writeContent;
	    //获取输入框的值
	    var address = $("input[name=address]").val();
	    var mony = $("input[name=mony]").val();
	    var biaoQ = $("input[name=biaoQ]").val();
	    // console.log("address:" + address)
	    // console.log("mony:" + mony)
	    // console.log("biaoQ:" + biaoQ)
		showPaymentaddress(address);//判断是否存在
		if(amountMoney<mony){
			mui.alert("有效余额不足",function(){
				closeTiShi();
			});
			return;
		}
	    var datadata = {
	        "jsonrpc": "1.0",
	        "method": "sendtoaddress",
	        "params": [
	            address,
	            mony,
	            biaoQ,
	            "seans outpost"
	        ]
	    };
	    $.ajax({
	        // 请求方式
	        type: "post",
	        contentType: "application/json",
	        url: ChangeEnv.path+walletName,
	        // username: ChangeEnv.username,
	        // password: ChangeEnv.password,
	        dataType: "json",
	        crossDomain: true,
	        jsonpCallback: "jsonpCallbackFun",
	        jsonp: "callback",
	        // 把JS的对象或数组序列化一个json 字符串
	        async: false,
	        data: JSON.stringify(datadata),
	        success: function(data) {
	            console.log(data.result);
				if(data.result){
					mui.alert('转账成功', function() {
	
						
						if(isWrite==0){
							if(!biaoQ){
								biaoQ="无"
							}
							writeContent="address:"+address+",lable:"+biaoQ+"|";
							FileUtil.writeFile("EAC/paymentAddress",writeContent);//给地址本添加记录
							
						}

						closeTiShi();
					});
					
				}else{
					mui.alert('网络繁忙请稍后重试!', function() {
						closeTiShi();
					});

				}

			},
			error: function(jqXHR) { 
					mui.alert('请输入人正确的地址!', function() {
										console.log("发生错误：" + jqXHR.status);
					});

			}
		});
	}


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
				// console.log(data.result);
		var dataLists =data.result.sort(function(a,b){
        return a.time < b.time ? 1 : -1
    });;	
			var dataList=[];
			for(var i=0;i<dataLists.length;i++){
			
				if(dataLists[i].category=="send"){
						// console.log("我看看");
					dataList.push(dataLists[i]);
				}
			}
				// console.log(dataList);
				var htmls;
				var label;
				if (data.result) {
					for (var i = 0; i < 5; i++) {
						if (dataList[i].comment) {
							label = dataList[i].comment;
						} else {
							label = "无";
						}

						htmls += '<tr style="border-top: solid #ccc 1px;">' + '<td data-id="' + dataList[i].txid +
							'" style="color: #1EB032;font-size: 16px; text-align:center; ">' + Common.formatDate(dataList[i].time * 1000) +
							'</td>'
						htmls += '<td data-id="' + dataList[i].txid + '" style=" font-size:13px; ">' + label + '</td>'
							htmls += '<td style="color: red;">' + dataList[i].amount + '</td></tr>'


					};
					$('#showDatas').append(htmls);
				} else {
					console.log("没有交易数据");
				}

			},
			error: function(jqXHR) {
				console.log("发生错误：" + jqXHR.status);
			}
		});



	}




	function scaned(t, r, f) {
		console.log("t:" + t + "r:" + r + "f:" + f);
		var data = Common.codeResolver(r);
		console.log(data);

		var address = data.split(",")[0];
		var amount = data.split(",")[1];
		var newLable = decodeURIComponent(data.split(",")[2]);
		console.log(data + "++++++++" + newLable);

		if (amount != 0) {
			$("input[name=mony]").val(amount);
		}
		if (newLable != 0) {
			$("input[name=biaoQ]").val(newLable);

		}
		if (address) {
			$("input[name=address]").val(address);
		}


		// window.location.href="send.html?data="+data;

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

				if (data.result) {
					var datas = data.result;
				
				amountMoney=datas.balance;
				$("#freeMoney").text(datas.paytxfee)								

							
							
				}

		 $("#toastBtn").click(function() {		
			 $("input[name=mony]").val(datas.balance);
			 
				})
	

			},
			error: function(jqXHR) {
				console.log("发生错误：" + jqXHR.status);
			}
		});
	}



	function showTiShi() {
		mui("#tiShi").popover("toggle");
		i=4;
		$('#send').attr("disabled","disabled");
		 timehwnd=setInterval('Countdown();',1000);
		
	}

	function closeTiShi() {

		mui("#tiShi").popover("toggle");
		// sendTo();
	}

	//发送延迟
	
	function Countdown() {
		i--;
		if (i == 0) {
			$("#send").html("发送");
			$("#send").removeAttr("disabled");
			clearInterval(timehwnd);
		} else {
			$("#send").html("发送(" + i + ")");
		}
	}

function showPaymentaddress(adress){
	paymentaddressData=FileUtil.readContent;
	var paymentaddressDatas=paymentaddressData.split('|');
	var paymentaddressDataNext='';

	for(var i=0;i<paymentaddressDatas.length-1;i++){
		paymentaddressDataNext=paymentaddressDatas[i].split(',');


		if(paymentaddressDataNext[1].split(":")[1]==adress) {
			isWrite=1;
		}


		
	} 

}