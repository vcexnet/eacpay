/* 修改密码 */
function set_pwd(){
	//获取表单单对象
	var oldPwd=document.getElementById("oldpwd");
	var newPwd=document.getElementById("newpwd");
	var newPwdRepeat=document.getElementById("newpwdRepeat");
	
	//验正密码是否为空
	if(oldPwd.value==='' || oldPwd.value==null){
		mui.alert("请填写原密码!");
		return;
	}
	if(newPwd.value ===''||newPwd.value===null){
		mui.alert("请输入新的密码!");
		return;
	}
	if(newPwdRepeat.value===''|| newPwdRepeat===null){
		mui.alert("重复密码不能为空!");
		return;
	}
	if (newPwd.value.length<6) {
	        mui.alert("输入的新密码少于6位!");
			return;
	    }
	if(newPwd.value !==newPwdRepeat.value){
		mui.alert("新密码前后不一致!");
		return;
	}
	if(oldPwd.value === newPwd.value ){
		mui.alert("新密码不能和原密码一致!");
	}else{
		mui.alert("修改成功!");
		}
}