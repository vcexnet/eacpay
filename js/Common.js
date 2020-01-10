//公共JS（封装公共方法）
function Common() {}



Common.prototype = {
	/**
	 * 设置userId公共访问
	 */ 
	userInfo: 0,
	setUserInfo: function() {
		//在session中获取用户信息
		var walletName = localStorage.getItem("walletName");
		
		// var a = ChangeEnv.getRequest();
		 console.log(walletName);

		
	// 	if(!walletName){
	// 		mui.alert('请先阅读使用协议', function() {
	// window.location.href="../pages/e_agreement.html";
				 
	// 		});
					
	// 	}
		
		
		
		


	},
	/**
	 * 存储原始数据到sessionStorage
	 * @param key
	 * @param value
	 */
	saveSessionData: function(key, value) {
		if(!key) {
			return;
		}
		sessionStorage.setItem(key, value);
	},
	/**
	 * 获得sessionStorage里数据
	 * @param  {[type]}  key    [description]
	 * @param  {Boolean} isJson [description]
	 * @return {[type]}         [description]
	 */
	getSessionData: function(key, isJson) {
		if(!key) {
			return null;
		}
		var value = sessionStorage.getItem(key);
		if(value && isJson) {
			return JSON.parse(value);
		}
		return value;
	},
	/**
	 * 清除sessionStorage数据
	 */
	clearSession: function() {
		sessionStorage.clear();
	},
	/**
	 * 移除sessionStorage制定key的缓存数据
	 * @param key
	 */
	removeSessionItem: function(key) {
		if(!key) {
			return;
		}
		sessionStorage.removeItem(key);
	},
	/**
	 * 设置localStorage数据
	 * @param key
	 * @returns {null}
	 */
	saveLocalData: function(key, value) {
		if(!key) {
			return;
		}
		localStorage.setItem(key, value);
	},
	
	/**
	  * 移除localStorage制定key的数据
	  * @param key
	  */
	 removeLocalItem: function(key) {
	  if(!key) {
	   return;
	  }
	  localStorage.removeItem(key);
	 },

	/**
	 * 读取localStorage数据
	 * @param key
	 * @returns {null}
	 */
	getLocalData: function(key, isJson) {
		if(!key) {
			return null;
		}
		var value = localStorage.getItem(key);
		if(value && isJson) {
			return JSON.parse(value);
		}
		return value;
	},

	/**
	 *检验参数
	 * @param argument
	 * @returns {string}
	 */
	isFieldNull: function(category) {
		return category ? category : "";
	},
	/**
	 * 将数字转换成金额显示
	 * @param num
	 */
	toMoney: function(num) {
		if(Common.isNull(num)) {
			return 0;
		}
		num = num.toFixed(2);
		num = parseFloat(num)
		num = num.toLocaleString();
		return num; //返回的是字符串23,245.12保留2位小数
	},
	/**
	 * 时间戳转换为年月日格式
	 *
	 * @param timestamp
	 * @returns {string}
	 */
	// formatDate: function(timestamp) {
	// 	if(!timestamp) return;
	// 	// shijianchuo是整数，否则要parseInt转换
	// 	var time = new Date(timestamp);
	// 	var y = time.getFullYear();
	// 	var m = time.getMonth() + 1;
	// 	var d = time.getDate();
	// 	var h = time.getHours();
	// 	var mm = time.getMinutes();
	// 	var s = time.getSeconds();
	// 	/*
	// 	 * return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) +
	// 	 * ':' + add0(s);
	// 	 */
	// 	return y + '-' + Common.add0(m) + '-' + Common.add0(d);
	// },
	formatDate:function(timestamp) { 
		if(!timestamp) return;
		// shijianchuo是整数，否则要parseInt转换
		var time = new Date(timestamp);
	     var year=time.getFullYear(); 
	     var month=time.getMonth()+1; 
	     var date=time.getDate(); 
	     var hour=time.getHours(); 
	     var minute=time.getMinutes(); 
	     var second=time.getSeconds(); 
	     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
	},
	add0: function(m) {
		return m < 10 ? '0' + m : m
	},
	/**
	 * 千位分割符
	 * @param num
	 * @returns {*|string}
	 */
	thousandBitSeparator: function(num, n, separator) {
		if(!num) return "￥" + 0;
		var parts;
		num = num + "";
		// 判断是否为数字
		if(!isNaN(parseFloat(num)) && isFinite(num)) {

			n1 = Math.pow(10, n);

			num = (Math.round(num * n1) / n1).toFixed(n);

			parts = num.split('.');
			parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

			return "￥" + parts.join('.');
		}
		return NaN;

	},
	/**
	 * 保留小数点后两位
	 * @param num
	 * @returns {number}
	 */
	decimalPointTwo: function(num, symbols) {
		if(!num) return 0 + symbols;
		return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/)) + symbols;
	},
	/**
	 * 电话校验
	 * @param 
	 */
	checkPhone: function(phone) {
		if(Common.isFieldNull(phone)) {
			var isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;

			var isFixMob = /^0?1[3|4|5|8][0-9]\d{8}$/;

			if(isFixMob.test(phone) || isMobilePhone.test(phone)) {
				return true;
			} else {
				mui.toast("号码格式有误，请重新输入");
				return false;
			}
		}
	},
	/**
	 * 身份证校验
	 * @param 
	 */
	checkIDCard: function(idcode) {
		// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
		// 详情查看javascript的数值范围

		if(Common.isFieldNull(idcode)) {
			// 加权因子
			var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			// 校验码
			var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

			var code = idcode + "";
			var last = idcode[17]; //最后一位

			var seventeen = code.substring(0, 17);

			// ISO 7064:1983.MOD 11-2
			// 判断最后一位校验码是否正确
			var arr = seventeen.split("");
			var len = arr.length;
			var num = 0;
			for(var i = 0; i < len; i++) {
				num = num + arr[i] * weight_factor[i];
			}

			// 获取余数
			var resisue = num % 11;
			var last_no = check_code[resisue];

			// 格式的正则
			// 正则思路
			/*
			第一位不可能是0
			第二位到第六位可以是0-9
			第七位到第十位是年份，所以七八位为19或者20
			十一位和十二位是月份，这两位是01-12之间的数值
			十三位和十四位是日期，是从01-31之间的数值
			十五，十六，十七都是数字0-9
			十八位可能是数字0-9，也可能是X
			*/
			var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

			// 判断格式是否正确
			var format = idcard_patter.test(idcode);

			// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
			if(last === last_no && format ? true : false) {
				return true;
			} else {
				mui.toast("身份证格式有误，请重新输入");
				return false;
			}

		}
	},
	/**
	 * 绑定双击头部事件，回到顶部
	 * @param 
	 * keyCode
	 * length：长度/位数
	 */
	setScrollTop: function() {
		var contentWebview = null;
		//监听标题栏的双击事件
		var headerEle = document.querySelector('header');
		if(Common.isFieldNull(headerEle)) {
			headerEle.addEventListener('doubletap', function() {
				if(contentWebview == null) {
					contentWebview = plus.webview.currentWebview().children()[0];
				}
				//内容区滚动到顶部
				contentWebview.evalJS("mui('body').pullRefresh().scrollTo(0,0,100)");
			});
		}
	},
	/**
	 * 下拉
	 * obj：下拉的元素
	 * callback：回调函数
	 */
	setPullToRefresh: function(obj, callback) {
		(mui)(function($) {
			$(obj).pullToRefresh({
				down: { //下拉
					callback: function() {
						//处理
						if(callback == null) {
							location.reload();
						} else {
							callback();
						}
						var self = this;
						setTimeout(function() {
							//关闭
							self.endPullDownToRefresh();
						}, 1000);
					}
				}
			});
		});
	},
	/**
	 * 上拉
	 * obj：上拉的元素
	 * callback：回调函数
	 */
	setPullToRefreshUP: function(auto, obj, callback) {
		(mui)(function($) {
			$(obj).pullToRefresh({
				up: {
					auto: auto, //默认执行一次上拉加载
					contentinit: '上拉加载更多',
					contentdown: '没有更多数据',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据',
					callback: function() {
						//回调
						callback & callback();
						var _self = this;
						setTimeout(function() {
							_self.endPullUpToRefresh(); //禁用上拉	
						}, 1000);
					}
				}
			});
		});
	},
	/**
	 * 蒙版对象
	 */
	mask: null,
	/**
	 * 下拉点击，添加隐藏蒙版
	 * callback：回调函数
	 * top：高度定位
	 */
	toggleMask: function(callback, top) {
		//判断是否已有蒙版
		if($(".mui-backdrop").size() > 0) {
			$(".mui-backdrop").remove();
			return;
		}

		//判断是否已有mask
		if(!Common.isFieldNull(Common.mask)) {
			Common.mask = mui.createMask(function() {
				$(".mui-table-view-cell:first").removeClass("mui-active")
			});
		}

		//打开蒙版
		Common.mask.show();

		//计算设置蒙版大小高度
		$(".mui-backdrop").css("top", top + "px");
	},
	/**
	 * 数字输入限制
	 * @param 
	 * keyCode
	 * length：长度/位数
	 */
	checkInputNumber: function(keyCode, length) {
		/* 数字*/
		if(keyCode >= 48 && keyCode <= 57) return true;
		/*小数字键盘*/
		if(keyCode >= 96 && keyCode <= 105) return true;
		/* Backspace, del, 左右方向键*/
		if(keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39) return true;
		return false;

	},
	/**
	 * iframe高度自适应
	 * @param {Object} iframe
	 */
	setIframeHeight: function(iframe) {

		if(iframe) {
			var tab = document.getElementById("mui-bar-tab");
			if(tab) {
				var clientHeight = tab.clientHeight;
				iframe.height = window.screen.availHeight - clientHeight;
			}
			/*var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
			if(iframeWin.document.body) {
				iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
			}*/
		}
	},
	/**
	 * 设置联动
	 * @param {Object} showPickerEle：doc对象-给该元素绑定点击事件开启联动
	 * @param {Object} layer：层级-几级联动
	 * @param {Object} data：联动数据
	 * @param {Object} callback：回调函数：选择联动值后触发
	 */
	setPicker: function(showPickerEle, layer, data, callback) {
		//普通示例
		var picker = new mui.PopPicker({
			layer: layer
		});
		picker.setData(data);
		showPickerEle.addEventListener('tap', function(event) {
			picker.show(function(items) {
				//返回 false 可以阻止选择框的关闭
				//return false;
				return callback & callback(items);
			});
		}, false);
	},
	encodeUtf8: function(text) {
	    const code = encodeURIComponent(text);
	    const bytes = [];
	    for (var i = 0; i < code.length; i++) {
	        const c = code.charAt(i);
	        if (c === '%') {
	            const hex = code.charAt(i + 1) + code.charAt(i + 2);
	            const hexVal = parseInt(hex, 16);
	            bytes.push(hexVal);
	            i += 2;
	        } else bytes.push(c.charCodeAt(0));
	    }
	    return bytes;
	},
	codeResolver: function(url){
		var address="", newLable=0, amount=0, typeText;
		

		var data=url.split('?');
		console.log(data);
		if (data.length>1) {
			var earthcoin = url.split('?')[0];
			address = earthcoin.split(':')[1];
			var remaining = url.split('?')[1];
			var each = remaining.split("&");
			if (each.length > 1) {
				for (var i = 0; i < each.length; i++) {
					typeText = each[i].split('=')[0];
					switch (typeText) {
						case 'amount':
							amount = each[i].split('=')[1];
							break;
						case 'label':
							newLable = decodeURI(each[i].split('=')[1]);
							break;
						default:
							console.log("其他");
							break;
					}
				}
			} else if (each.length == 1) {
				typeText = remaining.split('=')[0];
				switch (typeText) {
					case 'amount':
						amount = each[0].split('=')[1];
						break;
					case 'label':
						newLable = decodeURI(each[0].split('=')[1]);
						break;
					default:
						console.log("其他");
						break;
				}
		
			}
			
		}else{
			console.log(data);
			address=data[0].split(":")[1];
		}
		console.log("余额:" + amount + "   地址:  " + address + "   标签:    " + newLable);
		var datas={"address":address,"newLable":newLable,"amount":amount};
		 return address+","+amount+","+newLable;
	},
	utf16to8:function(str) {  
	    var out, i, len, c;  
	    out = "";  
	    len = str.length;  
	    for(i = 0; i < len; i++) {  
	    c = str.charCodeAt(i);  
	    if ((c >= 0x0001) && (c <= 0x007F)) {  
	        out += str.charAt(i);  
	    } else if (c > 0x07FF) {   
	        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
	        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));  
	        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
	    } else {  
	        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));  
	        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
	    }  
	    }  
	    return out;  
	},
	  toUtf8:function(str) {   
	      var out, i, len, c;   
	      out = "";   
	      len = str.length;   
	      for(i = 0; i < len; i++) {   
	          c = str.charCodeAt(i);   
	          if ((c >= 0x0001) && (c <= 0x007F)) {   
	              out += str.charAt(i);   
	          } else if (c > 0x07FF) {   
	              out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
	              out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
	              out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
	          } else {   
	              out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
	              out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
	          }   
	      }   
	      return out;   
	  }
	

}
/**
 * 实例化
 */
var Common = new Common();
//在Common.js中设置登录信息属性
Common.setUserInfo();

//设置双击头部，内容区滚动到顶部
Common.setScrollTop();