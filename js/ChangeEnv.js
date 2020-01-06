/**
 * 改变内外网环境JS类
 */

var ChangeEnv = function() {

}
ChangeEnv.prototype = {
	env: 0, //0为本地，1为内网，2为外0
	path: "", //服务器地址
	// envFilePath: "", //文件访问地址
	// envFileUploadPath: "", //文件上传地址
	forePath: "",
	changEnvironment: function() {
		// var getRootPath = ChangeEnv.getRootPath();
		// ChangeEnv.envFilePath = "http://img.99add.com/@";
		switch(ChangeEnv.env) {
			case 0:
				ChangeEnv.path = "http://182.151.14.132:8332/wallet/";
				ChangeEnv.username="wwweosgovcom";
				ChangeEnv.password="43rufenjf34rndsuinkwqfbhaucsa";
				break;
			case 1:
				ChangeEnv.path = "http://182.151.14.132:8332/";
				ChangeEnv.username="wwweosgovcom";
				ChangeEnv.password="43rufenjf34rndsuinkwqfbhaucsa";
				break;

			default:
				break;
		}

	},
	getRequest:function(){
		 var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
	},
	
	// getRootPath: function () {
	//     // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	//     var curWwwPath = window.document.location.href;
	//     // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	//     var pathName = window.document.location.pathname;
	//     var pos = curWwwPath.indexOf(pathName);
	//     // 获取主机地址，如： http://localhost:8083
	//     var localhostPaht = curWwwPath.substring(0, pos);
	//     // 获取带"/"的项目名，如：/uimcardprj
	//     var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	// 	console.log(projectName);
	//     return ( projectName);
	// },
}

var ChangeEnv = new ChangeEnv();
ChangeEnv.changEnvironment();