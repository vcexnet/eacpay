/* 接收(收款) */
var walletName = localStorage.getItem("walletName");
var adressData="";
$(function() {


 setTimeout(function(){  
	 FileUtil.readFile("EAC/adress");
	  }, 300);
	
setTimeout(function(){  
	
	 showAdressInfo(); }, 500);

});
function makeCode(adress){
	// var url = "earthcoin:ecGykiDwnuPdhpg9esxdLoEWvAgTUmEnoz?amount=20.00000000&label=%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90&message=%E5%B0%B1%E4%BC%9A";
	var writeContent="";
	
	var dataUrl="earthcoin:"+adress;
	var lable=$("#lable_1").val();
	var amount=$("#amount_1").val();
	var message=$("#message_1").val();
	if(amount){
			dataUrl+="?"+"amount="+amount;
		if(lable){
		dataUrl+="&label="+lable;	
		}
		if(message){
				dataUrl+="&message="+message;
		}
	}else if(lable){
		dataUrl+="?"+"label="+lable;
		if(message){
		dataUrl+="&message="+message;	
		}
	
	}else if(message){
		dataUrl+="?"+"message="+message;
	}
	console.log(dataUrl)
	// FileUtil
	console.log(Common.formatDate(new Date().getTime()));
	var date=Common.formatDate(new Date().getTime());
	if(!lable){
		lable="(无标签)";
	}
	if(!message){
		message="(无消息)";
	}
	if(!amount){
		amount="(无请求金额)";
		}
	writeContent="adress:"+adress+",data:"+date+",lable:"+lable+",message:"+message+",amount:"+amount+"|";
	FileUtil.writeFile("EAC/adress",writeContent);
	FileUtil.readContent=writeContent;
	$("#url_0").text(dataUrl);
	$('#qrcode').qrcode({width: 130,height: 130,text: dataUrl});//指定二维码大小
	
}
function showAdressInfo() {
	adressData=FileUtil.readContent;
	var adressDatas=adressData.split('|');
	// console.log(adressDatas.length);
	var adressDataNext='';
	var htmls="";
		
	for(var i=0;i<adressDatas.length-1;i++){
		adressDataNext=adressDatas[i].split(',');
		htmls+="<tr>";
		for(var j=1;j<adressDataNext.length;j++){
			console.log(adressDataNext[j]);
			if(j==1){
				htmls+= "<td>"+adressDataNext[j].split(":")[1]+adressDataNext[j].split(":")[2]+"</td>";
			}else{
							htmls+= "<td>"+adressDataNext[j].split(":")[1]+"</td>";
			}

			
			

		}
			htmls+="<tr/>";
	
		
	} 

	$('#showDatas').append(htmls);

		
	
	
	}

function huoqu() {



	var creatDirectory= localStorage.getItem("creatDirectory");
	
	// 	FileUtil.removeFile('EAC');
	// Common.saveLocalData("creatDirectory", 1);
	if(creatDirectory!=0){
		FileUtil.creatDirectory('EAC');
		Common.saveLocalData("creatDirectory", 0);
		FileUtil.creatFile('EAC/adress');
	}

	$("#qrcode").html("");


    var datas = {
        "jsonrpc": "1.0",
        "method": "getnewaddress",
        "params": []
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
        data: JSON.stringify(datas),
        success: function(data) {
            console.log(data.result);
			var  adress =data.result;
			if(adress){
				showTiShi();
				$("#newAdress").val(adress);
					makeCode(adress);
				}else{
					mui.toast("网络繁忙,请稍后重试！", {
					    duration: 'short',
					    type: 'div'
					})
				}


        },
        error: function(jqXHR) {
            mui.toast("系统错误！", {
                duration: 'short',
                type: 'div'
            })
        }
    });
}

function showTiShi() {
	mui("#tiShi").popover("toggle");
}

function closeTiShi() {
	
	mui("#tiShi").popover("toggle");
}

//复制地址
function copyUrl() {
	var walletName = $("#newAdress").val();
	if(walletName){
		var Url = document.getElementById("newAdress");
		Url.select(); // 选择对象
		document.execCommand("Copy"); //执行浏览器复制命令用户定义的代码区域用户定义的代码区域
		mui.toast('复制成功');
	}else{

	}
	
}
//清除input框里的内容
 function funClear(){
	  var txts=document.getElementsByTagName("input");  
	  for(var i=0;i<txts.length;i++)  
	  {  
		if(txts[i].type=="number","text")  
		{  
		  txts[i].value ="";  
		}  
	  }
 }
