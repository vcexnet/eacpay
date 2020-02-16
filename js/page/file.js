
var walletName = localStorage.getItem("walletName");
var oneTime=localStorage.getItem("oneTime");
var oldName;
var file_content = [];
var price;

$(function() {
   // Common.saveLocalData("walletName", "eVAr93C9FZQw4bMaXpU5hSK894WCwPdRBa");

	//创建对应的文件
	// document.addEventListener("plusready", function(){}, false);
     setTimeout(function(){createFileAll();}, 500);
        


	


});



function texting(){

		window.location.href="e_wallet.html";
	    // FileUtil.showData();
}
function createFileAll(){

	var createFileAll= localStorage.getItem("createFileAll");
	// FileUtil.showData();
	// 	FileUtil.removeFile('EAC');
		// Common.saveLocalData("createFileAll",1);
	alert(createFileAll+":createFileAll");
	if(createFileAll!="isCreate"){
		FileUtil.creatDirectory('EAC');

		setTimeout(function(){
			 FileUtil.creatFile('EAC/address');
			 FileUtil.creatFile('EAC/paymentAddress');
			 FileUtil.creatFile('EAC/nodeBook');
			 FileUtil.creatFile('EAC/addressKey');
			 Common.saveLocalData("createFileAll", "isCreate");
			 
			 // console.log("创建完毕");
			 }, 500);
		


	}else{
		FileUtil.showData();
		}
}