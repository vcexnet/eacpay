/* 接收(收款) */
var walletName = localStorage.getItem("walletName");
var addressData="";
$(function() {

// gerPivKey("epEzad8LMjBBn4jFpAaDTF1ZNXDYuy4xSA");
 setTimeout(function(){  
	 FileUtil.readFile("EAC/address");
	  }, 500);
setTimeout(function(){  
	 showaddressInfo(); }, 800);
});
/* 生成请求二维码 */
function makeCode(address){
	// var url = "earthcoin:ecGykiDwnuPdhpg9esxdLoEWvAgTUmEnoz?amount=20.00000000&label=%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90&message=%E5%B0%B1%E4%BC%9A";
	var writeContent="";	
	var dataUrl="earthcoin:"+address;
	var lable=$("#lable_1").val();
	var amount=$("#amount_1").val();
	var message=$("#message_1").val();
	if(amount){
			dataUrl+="?"+"amount="+amount;
		if(lable){
		dataUrl+="&label="+encodeURI(lable);	
		}
		if(message){
				dataUrl+="&message="+encodeURI(message);
		}
	}else if(lable){
		dataUrl+="?"+"label="+encodeURI(lable);
		if(message){
		dataUrl+="&message="+encodeURI(message);	
		}
	
	}else if(message){
		dataUrl+="?"+"message="+encodeURI(message);
	}
	

	console.log(dataUrl)

	$("#url_0").text(dataUrl);
	$("#lable").val(lable);
	$("#money").val(amount);
	$("#messages").val(message);
	$("#newaddress").val(address);
	$("#qrcode").html("");
	$('#qrcode').qrcode({width: 130,height: 130,text: dataUrl});//指定二维码大小
		showTiShi();
		// 文件写入操作
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
		writeContent="address:"+address+",date:"+date+",lable:"+lable+",message:"+message+",amount:"+amount+"|";
		FileUtil.writeFile("EAC/address",writeContent);//给地址本添加记录

}
/* 单条请求付款历史记录 */
function makeCodeNew(address,lable,message,amount){
	// var url = "earthcoin:ecGykiDwnuPdhpg9esxdLoEWvAgTUmEnoz?amount=20.00000000&label=%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90&message=%E5%B0%B1%E4%BC%9A";

	
	var dataUrl="earthcoin:"+address;

	if(amount){
			dataUrl+="?"+"amount="+amount;
		if(lable){
		dataUrl+="&label="+encodeURI(lable);
		}
		if(message){
				dataUrl+="&message="+encodeURI(message);
		}
	}else if(lable){
		dataUrl+="?"+"label="+encodeURI(lable);
		if(message){
		dataUrl+="&message="+encodeURI(message);	
		}
	
	}else if(message){
		dataUrl+="?"+"message="+encodeURI(message);
	}
	// console.log(dataUrl)
	// FileUtil




	$("#url_0").text(dataUrl);
	$("#lable").val(lable);
	$("#money").val(amount);
	$("#messages").val(message);
	$("#newaddress").val(address);
	$('#qrcode').qrcode({width: 130,height: 130,text: dataUrl});//指定二维码大小
	showTiShi();
	
}
/* 请求付款历史  */
function showaddressInfo() {
	addressData=FileUtil.readContent;
	var addressDatas=addressData.split('|');
	// console.log(addressDatas.length);
	var addressDataNext='';
	var htmls="";
	var dataId="";
	for(var i=0;i<addressDatas.length-1;i++){
		addressDataNext=addressDatas[i].split(',');
		// alert(addressDataNext[0].split(':')[1]);
		dataId=addressDataNext[0].split(':')[1];
		htmls+='<tr  data-id="' + dataId +'" class="showModel">';

		// htmls+='<tr  class="showModel">';
		for(var j=1;j<addressDataNext.length;j++){
			// console.log(addressDataNext[j]);
			if(j==1){
				htmls+= '<td>'+addressDataNext[j].split(':')[1]+':'+addressDataNext[j].split(':')[2]+':'+addressDataNext[j].split(":")[3]+'</td>';
			}else{
				htmls+= '<td>'+addressDataNext[j].split(":")[1]+'</td>';
			}

		}
			htmls+='<tr/>';
	
		
	} 

	$('#showDatas').append(htmls);

	



			 $(".showModel").click(function() {
				$("#qrcode").html("");
				var lable="",message="",amount="";
			 	var dataText=$(this).html();
			 	var dataArray=dataText.split("</td>");
			 	// alert(dataArray[3].split('>')[1]);
				if(dataArray[1].split('>')[1]!="(无标签)"){
					 	 lable=dataArray[1].split('>')[1];
					
					} 
				 if(dataArray[2].split('>')[1]!="(无消息)"){
					  	 message=dataArray[2].split('>')[1];
					 
					 }
					 if(dataArray[3].split('>')[1]!="(无请求金额)"){
					  	 amount=dataArray[3].split('>')[1];
					 					 
					 }
					 
					 
					 
					 
			 	 // amount=dataArray[3].split('>')[1]);
			 	// alert(lable);
			 	makeCodeNew($(this)[0].dataset.id,lable,message,amount);
			  });

	}
	


function huoqu() {
	// var creatDirectory= localStorage.getItem("creatDirectory");
	
	// 	FileUtil.removeFile('EAC');
	// Common.saveLocalData("creatDirectory", 1);
	// if(creatDirectory!=0){

	// 	Common.saveLocalData("creatDirectory", 0);
	// 	FileUtil.creatFile('EAC/address');
	// }


	var lable=$("#lable_1").val();
	
    var datas = {
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
        data: JSON.stringify(datas),
        success: function(data) {
            console.log(data.result);
			var  address =data.result;
			if(address){
					gerPivKey(address);
					makeCode(address);
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
	var walletName = $("#newaddress").val();
	if(walletName){
		var Url = document.getElementById("newaddress");
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


function gerPivKey(address){
	
	var writeContent;
	var datadata = {
		"jsonrpc": "1.0",
		"method": "dumpprivkey",
		"params": [address]
	};
	$.ajax({
		// 请求方式
		type: "post",
		contentType: "application/json",
		url: ChangeEnv.path+walletName,
		username: ChangeEnv.username,
		password: ChangeEnv.password,
		dataType: "json", //返回json格式的数据
		crossDomain: true,
		jsonpCallback: "jsonpCallbackFun",
		jsonp: "callback",
		// 把JS的对象或数组序列化一个json 字符串
		async: false,
		data: JSON.stringify(datadata),
		success: function(data) {
			console.log(data.result);
			var prvKey = data.result;
			
		writeContent=address+":"+prvKey+"|";
		console.log(writeContent);
		 FileUtil.writeFile("EAC/addressKey",writeContent);//地址以及对应私钥添加记录
	
		},
		error: function(jqXHR) {
			console.log("发生错误：" + jqXHR.status);
		}
	});
	
}


function texting(){
	FileUtil.showData();
}