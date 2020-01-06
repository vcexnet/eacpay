var walletName = localStorage.getItem("walletName");

var file_content = [];
$(function() {
// walletName="eVAr93C9FZQw4bMaXpU5hSK894WCwPdRBa";

	if (!walletName) {
		
		$("#changeFile").css("display", "block");
		showInputWalletName();
	}else{
		window.location.href="../pages/e_wallet.html";
	}

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

});



function readXuZhi() {
	var readXuzhi = $("#isCheck").is(":checked");
	if (readXuzhi) {
		if(walletName){
			window.location.href="../pages/e_wallet.html";
		}else{
			var btnArray = ['取消', '确认'];
			mui.confirm('即将自动您创建钱包,请注意保存该名字', '提示', btnArray, function(e) {
				if (e.index == 1) {
					mui.toast('已经同意');
			
						creatNewAdress();	
			
						
				} else {
					mui.toast('点击了取消');
				}
			})
		}


	} else {
		mui.toast('请先阅读并同意本协议');
	}

}
function creatNewAdress() {
	var parm="钱包";


	var datadata = {
		"jsonrpc": "1.0",
		"method": "getnewaddress",
		"params": [parm]
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
		console.log(data);
		var walletName =data.result;
		creatWallet(walletName);
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
}

function creatWallet(name) {

	var datadata = {
		"jsonrpc": "1.0",
		"method": "createwallet",
		"params": [name]
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
			console.log(data);
			Common.saveLocalData("walletName", name);
			Common.saveLocalData("oneTime", 0);
			exportRaw('wallet_name.txt',name);
			window.location.href="../pages/e_wallet.html";
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
}


function fakeClick(obj) {
   var ev = document.createEvent("MouseEvents");
   ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
     var urlObject = window.URL || window.webkitURL || window;
     var export_blob = new Blob([data]);
     var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
     save_link.href = urlObject.createObjectURL(export_blob);
     save_link.download = name;
     fakeClick(save_link);
   };


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

			if (data.result) {
				Common.saveLocalData("walletName", name);
				closeInputWalletName();
				window.location.href="../pages/e_wallet.html";
			}
			


		},
		error: function(jqXHR) {
			mui.alert('该名字不存在,请重新填写', function() {
				console.log(jqXHR);
			});

		}
	});
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
