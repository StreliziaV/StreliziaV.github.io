/**
 * 使用原生js制作音乐播放器插件
 */
//创建闭包
(function(global) {
	// 9.定义一个常量,挂载到window,便于用户修改
	var __INFO__ = {
		plug:"DNmusicPlay", // 插件的名称
		version:"1.0.1", // 版本号
		author:"TL"// 作者
	}
 
	// 3.定义默认值
	var defaults = {
		audioUrl:"",
		nodeID:"",
		boxStyle:"",
		bottonSrc:"",
		htmls:`<audio autoplay loop style="width: 0px">
					<source src="" type="audio/mpeg" />
				</audio>
				<a style="width: 24px;height: 24px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplODZjZmIzYy1kZmNkLTQ4NTUtOTg4Yi0zNmI5OTNhNzllZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Y5RjUxNUU4NzRBMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Y5RjUxNUQ4NzRBMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmJkZjhjOGItYmMwMy00NTVlLTg3N2EtYzYxNWVhMjU5ZGQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmU4NmNmYjNjLWRmY2QtNDg1NS05ODhiLTM2Yjk5M2E3OWVlOCIvPiA8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) transparent no-repeat scroll top left;background-size: 100% auto;display: inline-block;" href="javascript:;" title="音乐开关"></a>
				<select style="vertical-align: top;">
				</select>`, // 使用ES6语法,字符串模板
	}
	// 2.定义插件名称
	var PlugCode = function(options) {
		// 4.合并缺损值(默认值)和用户自定义的值 jQuery:$.extend({},defaults,options)  ES6:Object.assign({},defaults,options) 浅拷贝
		var settings = Object.assign({},defaults,options); // 将defaults(默认值)和options(用户传参)合并到一个空对象中
 
		// 5.获取用户节点
		var audioDOM = document.getElementById(settings.nodeID);
		// 6.用户没有传值,默认为body节点
		if(!audioDOM) audioDOM = document.body;
		
		// 7.创建一个div元素节点,使得htmls返回一个对象，便于操作
		var audioBOX = document.createElement("div");
		// 8.赋值 设置指定位置
		audioBOX.id = "dnmusiccontrol";
		audioBOX.style = "opacity: 0.5;overflow: hidden;position: absolute;z-index: 2147483646;" + settings.boxStyle;
		audioBOX.innerHTML = settings.htmls; // 使用innerHTML,插入htmls
		audioDOM.appendChild(audioBOX); // 使用appendChild,插入音乐盒子
 
		// 操作htmls中的元素(按钮...)
		// 11.获取对象
		var audioButton = audioBOX.querySelectorAll("a")[0]; // 使用querySelectorAll找到a元素,返回一个nodeList对象
		var audioList = audioBOX.querySelectorAll("select")[0];
		var audioTag = audioBOX.querySelectorAll("audio")[0];
 
		// 23.修改音乐按钮图标
		// 判断用户是否修改图标
		if(settings.buttonSrc) audioButton.style.backgroundImage = "url(" + settings.buttonSrc + ")";
 
		// 21.初始化按钮状态(按钮背景)
		audioButton.state = true;
 
		// 12.定义操作方法
		var audioFN = {
			// 20.修改背景 传参url
			// 播放
			play:function(url) {
				// 文件路径
				if(url) audioTag.src = url;
				// 背景图
				audioButton.style.backgroundPosition = "0 0";
				audioTag.play();
			},
			// 暂停
			stop:function() {
				audioButton.style.backgroundPosition = "0 100%";
				audioTag.pause();
			}
		};
 
		// 13.判断设备是PC端还是移动端 
		//定义 _device 变量接收
		var _device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())); // 返回true 移动端 false PC端
		// 定义事件
		var clickEvtName = _device ? "touchstart" : "mousedown"
 
		// 14.通过addEventListener,给按钮绑定事件
		audioButton.addEventListener(clickEvtName,function(e){
			// 给当前按的按钮赋值
			// console.log(e.type);
			if(this.state){
				this.state = false;
				// 暂停
				audioFN.stop();
			}else{
				this.state = true;
				// 播放
				audioFN.play();
			}
		});
 
		// 15.对文件路径进行操作
		// 16.定义变量_urlType 接收类型
		var _urlType = toString.apply(settings.audioUrl);
		// console.log(_urlType);
		// 17.通过判断,传参统一变为数组形式
		if(_urlType === '[object Object]'){
			// 定义一个空数组
			var _temp = [];
			// 将settings.audioUrl放入其中
			_temp.push(settings.audioUrl);
			// 转换,将传入的对象转为,并重新赋值
			settings.audioUrl = _temp;
		}
		// 18.当用户什么都没传时
		if(!settings.audioUrl.length){
			console.log(__INFO__.plug + "因无音乐资源启动失败,请添加音乐资源 audioUrl:");
			return;
		}
		// 19.使用typeof,判断传参是数组还是字符串
		if(typeof settings.audioUrl === 'object'){ // 数组
			console.log("数组对象自动播放音乐");
			// 设置默认播放地址
			audioTag.src = settings.audioUrl[0].source;
			// 遍历
			for(var i=0; i<settings.audioUrl.length; i++){
				// 创建option标签
				var _option = new Option(settings.audioUrl[i].title,settings.audioUrl[i].source);
				// 通用add,将option标签添加到audioList列表中
				audioList.add(_option);
			}
		}else{ // 字符串
			// 赋值
			audioTag.src = settings.audioUrl;
			// 隐藏列表
			audioList.style.display = "none";
		}
 
		// 22.制作音乐切换
		// 监听select列表的change事件
		audioList.addEventListener("change",function(e) {
			var musicName = this.options[this.selectedIndex].value; // selectedIndex 为 option 的索引
			// 播放音乐
			audioFN.play(musicName);
			// 修改音乐按钮状态
			audioButton.state = true;
		})
 
		// 24.兼容微信
		// 通过浏览器厂商,判断是否为微信
		if(navigator.userAgent.toLowerCase().match(/micromessenger/i)){
			document.addEventListener("WeixinJSBridgeReady",function onBridgeReady() {
				// 模拟获取用户网络
				WeixinJSBridge.invoke("getNetworkType",{},function(e){
					audioFN.play(); 
				})
			})
		}
 
 
	} // 结束 插件
 
	// 10.将插件代码放入window对象中
	global[__INFO__.plug] = PlugCode;
})(typeof window !== "undefined" ? window : this) // 1.传入window对象,并进行兼容处理