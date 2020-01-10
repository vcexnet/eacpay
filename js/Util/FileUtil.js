//公共JS（封装公共方法）
function FileUtil() {}

/** 
 * 现有文件:
 *address(新建地址本)  格式:address:ekQJLfq4PYGa9bbYRTGyag2v1KLDKLkhi4,data:2020-1-6 17:29:38,lable:(无标签),message:(无消息),amount:(无请求金额)|
 *paymentAddress(付款地址)  格式:address:eaVC8bsGAMC8ba6fRzmvJBJqvGP1zhr3rF,lable:我再测试存地址|
 *nodeBook(节点文本)  格式:
 *addressKey(地址以及对应的私钥)  格式:
 * 
 * 
 */


FileUtil.prototype = {
	dir:"",
	current:null,
	parent:null,
	pitem:null,
	list:null,
	readContent:"",//用于读出来的数据赋值
	plusRead:function(){
   		document.addEventListener('plusready', function(){
   			//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
   			
   		});
	},
	filePath:"_downloads",
	/**
	 * 创建文本
	 * @param {Object} fileName 文本名字
	 */
	creatFile:function(fileName) {  
	    // 确定调用的创建方法  
	    var method ="getFile";  
	    // 当前目录的 DirectoryEntry  
		var items = $("#_downloads")[0];
	    var parent =items.entry;  
	    // 执行创建  
	    parent[method]("./" +fileName+".txt", { create: true, exclusive: true },  
	        function (entry) {  
	            console.log("创建成功: " + entry.fullPath);  
	        }, function (error) {  
				console.log(error.message);
				
	        });  
	},
	/**
	 * 创建文件夹
	 * @param {Object} DirectoryName：文件夹名字
	 */
	creatDirectory:function(DirectoryName) {  
	    // 确定调用的创建方法  
	    var method ="getDirectory";  
	    // 当前目录的 DirectoryEntry  
		var items = $("#_downloads")[0];
	    var parent =items.entry;  
	
	    // 执行创建  
	    parent[method]("./" +DirectoryName, { create: true, exclusive: true },  
	        function (entry) {  
	  
	            console.log("创建成功: " + entry.fullPath);  
	        }, function (error) {  
	
				console.log(error.message);
	        });  
	},
	/**
	 * 读取文本内容
	 * @param {Object} fileName：文件名字
	 */
	readFile:function(fileName){
			var text="";
		plus.io.resolveLocalFileSystemURL("_downloads/",function(entry){
		entry.getFile("_downloads/"+fileName+".txt",{create:true,exclusive:false},
		function(file){
			//读取文件内容
			var read=new plus.io.FileReader();
			//sread.readAsText(file,“utf-8”)
			read.readAsText(file,"UTF-8");
			read.onloadend=function(res){//读取文件内容成功后的回调事件
			//res.target.result读取到的文件内容信息


			FileUtil.readContent=res.target.result;
			console.log(FileUtil.readContent);
			}
			})
		});


	},
	/**
	 * 写文本
	 * @param {Object} fileName：文本名字
	 * @param {Object} fileContent：文本写入内容
	 */
	writeFile:function(fileName,fileContent){
	
		plus.io.resolveLocalFileSystemURL("_downloads/",function(entry){
		entry.getFile("_downloads/"+fileName+".txt",{create:true,exclusive:false},
		function(file){
			//写入文件
			file.createWriter( function ( writer ) {
	
				//指针指向文件内容的尾部(从最后一位开始写)
				writer.seek( writer.length );
				//写入数据信息
				writer.write(fileContent);
				writer.onwrite = function ( e ) {//成功写入文件后的回调事件
				console.log( "Write data success! ");
				};
			}, function ( e ) {
				alert( e.message );
				} );
			})
		});
	},
	/**
	 * 删除目录(慎用)
	 * @param {Object} fileName 文本名字
	 */
	removeFile:function(fileName){
		plus.io.resolveLocalFileSystemURL("_downloads/"+fileName,function(entry){
			//写入文件
			entry.removeRecursively( function ( entry ) {
	
				console.log(entry);
				console.log( "remove data success! ");
				});
			
			})
		},
		showData:function(){
			var items = $("#_downloads")[0];
			console.log(items.id);
		    var self = items;  
			console.log(self) ;   // 当前目录的 DirectoryEntry  
		    var parent = self.entry; 
			// alert(self);
			console.log(parent.fullPath);
			// alert(parent.fullPath);
			
		
		}
}


var FileUtil = new FileUtil();
