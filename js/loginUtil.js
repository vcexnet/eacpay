//公共JS（封装公共方法）
function loginUtil() {}



loginUtil.prototype = {

	userIsLogin: function() {
		//在session中获取用户信息
		var walletName = localStorage.getItem("walletName");
		
		var a = ChangeEnv.getRequest();
		 console.log(walletName);

		
		if(!walletName){
			mui.alert('请先阅读使用协议', function() {
	window.location.href="../pages/e_agreement.html";
				 
			});
					
		}
		
		
		
		


	},

}
/**
 * 实例化
 */
var Common = new Common();
//在Common.js中设置登录信息属性
Common.setUserInfo();

//设置双击头部，内容区滚动到顶部
Common.setScrollTop();