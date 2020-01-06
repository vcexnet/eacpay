	var walletName = localStorage.getItem("walletName");
	var url=JSON.stringify(ChangeEnv.getRequest());


//付款
	$(function() {
		
		
	
		if(url.split(":")[1]){
				console.log(url.split(":")[1]);
			var newData=url.split(":")[1]
			var adress=newData.split(",")[0].replace('"', '');
			var amount=newData.split(",")[1];
			var newLable=decodeURIComponent(newData.split(",")[2].replace('"}', ''));
			console.log(newData+"++++++++"+newLable);
			
			if(amount!=0){
							$("input[name=mony]").val(amount);
			}
			if(newLable!=0){
						$("input[name=biaoQ]").val(newLable);
				
			}
			if(adress){
						$("input[name=address]").val(adress);
			}
			
		}
		// listReceivedByAddress();
		showTransactions();
	});
	
	//判断付款地址是否为空
	function my_sendBtn(){
		//获取表单对象
		var address=document.getElementById("my_address");
		var amount=document.getElementById("my_amount");
		var sed_Btn=document.getElementById("sendBtn");
		//验证项目是否为空
		if(address.value==='' ||address.value===null){
			mui.alert("请填写对方地址!",function(){
				
			});
			return;
		}
		if(amount.value===''||amount.value===null){
			mui.alert("请填写付款金额",function(){
				
			});
			return;
		}
		
			var btnArray = ['取消', '发送'];
			mui.confirm('您确定要发送出吗?', '付款提示', btnArray, function(e) {
				
			})
		
		
	};

	
		
	//显示交易记录
	// function showTransactions() {
	$("#sendBtn").on("click", function() {
	    //获取输入框的值
	    var address = $("input[name=address]").val();
	    var mony = $("input[name=mony]").val();
	    var biaoQ = $("input[name=biaoQ]").val();
	    // console.log("address:" + address)
	    // console.log("mony:" + mony)
	    // console.log("biaoQ:" + biaoQ)
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
					});
				}else{
					mui.alert('网络繁忙请稍后重试!', function() {
					});
				}

	        },
	        error: function(jqXHR) {
				
	            console.log("发生错误：" + jqXHR.status);
	        }
	    });
	})
	
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
            var htmls;
			var label;
			var news;
			if(data.result){
				for (var i = 0; i < dataList.length; i++) {
				    if (dataList[i].label) {
				        label=dataList[i].label;
				    } else {
				        label="无";
				    }
					if(dataList[i].news){
						news=dataList[i].news;
					}else{
						news="无";
					}
				    htmls += '<tr >' + '<td data-id="' + dataList[i].txid + '" style="color: #1EB032;font-size: 16px; text-align:center; ">日期:' + Common.formatDate(dataList[i].time) + '</td>'
				    htmls += '<td data-id="' + dataList[i].txid + '" style=" font-size:13px; ">' + label + '</td>'
				    htmls += '<td data-id="' + dataList[i].txid + '">' + news + '</td>'
				    htmls += '<td  style="color: #1EB032; ">' + dataList[i].amount + '</td></tr>'
				
				};
				$('#showDatas').append(htmls);
			}else{
				console.log("没有交易数据");
			}

        },
        error: function(jqXHR) {
            console.log("发生错误：" + jqXHR.status);
        }
    });


}

	
	function listReceivedByAddress() {
	
		var datadata = {
			"jsonrpc": "1.0",
			"method": "listreceivedbyaddress",
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
				var htmls;
				var cont;
				for (var i = 0; i < dataList.length; i++) {
					htmls += '<tr >'+'<td  style="color: #1EB032;font-size: 16px; text-align:center; ">成功</td>'
					htmls += '<td style="text-align: left; font-size:13px; ">收款自：' + dataList[i].address + '\n时间:' + Common.formatDate(dataList[i].time) +'</td>'
					htmls += '<td style="color: #1EB032; ">' + dataList[i].amount + '</td></tr>'
				};
				$('#showDatas').append(htmls);
			},
			error: function(jqXHR) {
				alert("发生错误：" + jqXHR.status);
			}
		});
	
	
	}
	
	function scaned(t, r, f) {
				console.log("t:" + t + "r:" + r + "f:" + f);
				var data= Common.codeResolver(r);
							console.log(data);
	
					var adress=data.split(",")[0];
					var amount=data.split(",")[1];
					var newLable=decodeURIComponent(data.split(",")[2]);
					console.log(data+"++++++++"+newLable);
					
					if(amount!=0){
									$("input[name=mony]").val(amount);
					}
					if(newLable!=0){
								$("input[name=biaoQ]").val(newLable);
						
					}
					if(adress){
								$("input[name=address]").val(adress);
					}
					
	
				// window.location.href="send.html?data="+data;
							
			}
	
	
	// 打开二维码扫描界面 
	function openBarcode(){
		createWithoutTitle('barcode_scan.html', {
			titleNView:{                                                                                                                                           
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

				$("input[name=mony]").val(datas.balance);
				}
	
	
	
			},
			error: function(jqXHR) {
				console.log("发生错误：" + jqXHR.status);
			}
		});
	}