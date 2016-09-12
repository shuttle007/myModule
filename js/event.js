//事件封装
var eventUtil = {
	addHandler: function(ele, type, fn) {
		if(ele.addEventListener) {
			ele.addEventListener(type, fn, false);
		} else if(ele.attachEvent) {
			ele.attachEvent('on' + type, fn);
		} else {
			ele['on' + type] = fn;
		}
	},
	removeHandler: function(ele, type, fn) {
		if(ele.removeEventListener) {
			ele.removeEventListener(type, fn, false);
		} else if(ele.detachEvent) {
			ele.detachEvent('on' + type, fn);
		} else {
			ele['on' + type] = null;
		}
	},
	//获取事件对象
	getEvent: function(ev){
		return window.event || ev;
	}
};


//cookie功能
//cookie
var CookieUtil = {
	get: function(name) {
		//在document.cookie字符串中查找cookie名加上等于号的位置
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart > -1) {
			//查找cookieStart之后之后的第一个分号，即该cookie的结束位置
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			//解码
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	//参数按照使用频率排列，只有前两个是必须的
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if(expires instanceof Date) {
			//正确格式化Date对象
			cookieText += "; expires=" + expires.toGMTString();
		}
		if(path) {
			cookieText += "; path=" + path;
		}
		if(domain) {
			cookieText += "; domain=" + domain;
		}
		if(secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},
	unset: function(name, path, domain, secure) {
		//没有删除已有
		this.set(name, "", new Date(0), path, domain, secure);
	}
};
