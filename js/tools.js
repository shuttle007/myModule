
var tools = {};
//实现自己的push功能，模仿jquery
tools.mypush = function(target, els) {
	var j = target.length,
		i = 0;
	while((target[j++] = els[i++])) {}
	target.length = j - 1;
};
//封装trim函数
tools.myTrim = function(str) {
	if(String.prototype.trim) {
		return str.trim();
	} else {
		return str.replace(/^\s+|\s+tools/g, '');
	}
};
//复合选择器
//tools('.dv','p'); 优势是：第二个参数可以是DOM对象，可以是JQuery对象，可以是选择器字符串
//等价于 tools('p .dv');
//tools('.dv',context,results);
//基本选择器
tools.getId = function(id, results) {
	results = results || [];
	results.push(document.getElementById(id));
	return results;
}
tools.getTag = function(tag, context, results) {
	results = results || [];
	try {
		results.push.apply(results, context.getElementsByTagName(tag));
	} catch(e) {
		tools.mypush(results, context.getElementsByTagName(tag));
	}
	return results;
}
tools.getClass = function(cls, context, results) {
	results = results || [];
	if(document.getElementsByClassName) {
		results.push.apply(results, context.getElementsByClassName(cls));
	} else {
		tools.each(tools.getTag('*', context), function(i, v) {
			if((' ' + v.className + ' ').indexOf(' ' + cls + ' ') != -1) {
				results.push(v);
			}
		});
	}
	return results;
}
tools.$ = function(selector, context, results) {
		results = results || [];
		context = context || document;
		var rExp = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))|tools/,
			m = rExp.exec(selector);
		if(m) {
			if(context.nodeType) {
				context = [context];
			}
			if(typeof context == 'string') {
				context = tools.tools(context);
			}
			tools.each(context, function(i, v) {
				if(m[1]) {
					results = tools.getId(m[1], results);
				} else if(m[2]) {
					results = tools.getClass(m[2], v, results);
				} else if(m[3]) {
					results = tools.getTag(m[3], v, results);
				} else if(m[4]) {
					results = tools.getTag(m[4], v, results);
				}
			});
		}
		return results;
	}
	//数组（类数组）迭代
tools.each = function(arr, fn) {
	for(var i = 0; i < arr.length; i++) {
		if(fn.call(arr[i], i, arr[i]) === false) break;
	}
};
//获取事件对象
tools.event = function(ev){
	return window.event || ev;
}
