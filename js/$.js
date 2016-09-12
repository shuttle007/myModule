/*
 * 	@ Name: Yanni Javascript Library
	@ Author: Yanni Zhang
	@ Date: 2016 - 8 - 22
	@ Email: zhdreal## gmail.com
	@ Version: 1.0
	@ Update: http: //zs 
	功能：
	1: $ID选择
	2： 事件绑定， 事件移除， 获取事件目标
	3： 阻止冒泡， 阻止默认事件
	4： 显示隐藏
	5： 去除HTML
	6： 去除首尾空格
	7： 获取URL参数
	8： Cookie操作， 设置， 删除， 获取
	9： 清除所有Cookie
	10： 表格排序
	11: 动态转入Javascript
	12: 封装Ajax
	13： 将HTML编码
	调用方法：
	ZS.x();
*/
var $ = {};
//实现自己的push功能，模仿jquery
$.mypush = function(target, els) {
	var j = target.length,
		i = 0;
	while((target[j++] = els[i++])) {}
	target.length = j - 1;
};
//封装trim函数
$.myTrim = function(str) {
	if(String.prototype.trim) {
		return str.trim();
	} else {
		return str.replace(/^\s+|\s+$/g, '');
	}
};
//复合选择器
//$('.dv','p'); 优势是：第二个参数可以是DOM对象，可以是JQuery对象，可以是选择器字符串
//等价于 $('p .dv');
//$('.dv',context,results);
//基本选择器
$.getId = function(id, results) {
	results = results || [];
	results.push(document.getElementById(id));
	return results;
}
$.getTag = function(tag, context, results) {
	results = results || [];
	try {
		results.push.apply(results, context.getElementsByTagName(tag));
	} catch(e) {
		$.mypush(results, context.getElementsByTagName(tag));
	}
	return results;
}
$.getClass = function(cls, context, results) {
	results = results || [];
	if(document.getElementsByClassName) {
		results.push.apply(results, context.getElementsByClassName(cls));
	} else {
		$.each($.getTag('*', context), function(i, v) {
			if((' ' + v.className + ' ').indexOf(' ' + cls + ' ') != -1) {
				results.push(v);
			}
		});
	}
	return results;
}
$.$ = function(selector, context, results) {
		results = results || [];
		context = context || document;
		var rExp = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))|$/,
			m = rExp.exec(selector);
		if(m) {
			if(context.nodeType) {
				context = [context];
			}
			if(typeof context == 'string') {
				context = $.$(context);
			}
			$.each(context, function(i, v) {
				if(m[1]) {
					results = $.getId(m[1], results);
				} else if(m[2]) {
					results = $.getClass(m[2], v, results);
				} else if(m[3]) {
					results = $.getTag(m[3], v, results);
				} else if(m[4]) {
					results = $.getTag(m[4], v, results);
				}
			});
		}
		return results;
	}
	//数组（类数组）迭代
$.each = function(arr, fn) {
	for(var i = 0; i < arr.length; i++) {
		if(fn.call(arr[i], i, arr[i]) === false) break;
	}
};

