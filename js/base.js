/*
 * 	@ Name: Yanni Javascript Library
	@ Author: Yanni Zhang
	@ Date: 2016 - 8 - 22
	@ Email: zhdreal## gmail.com
	@ Version: 1.0
	@ Update: http: //zs 
	功能：
	1: toolsID选择
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
	$().xxx();
*/
//前台调用
var $ = function(){
    return new Base();
}
var Base = function(){};
//基础库

//实现自己的push功能，模仿jquery
Base.prototype.mypush = function(target, els) {
	var j = target.length,
		i = 0;
	while((target[j++] = els[i++])) {}
	target.length = j - 1;
};
//封装trim函数
Base.prototype.myTrim = function(str) {
	if(String.prototype.trim) {
		return str.trim();
	} else {
		return str.replace(/^\s+|\s+$/g, '');
	}
};
//复合选择器
//$('.dv','p'); 优势是：第二个参数可以是DOM对象，可以是JQuery对象，可以是选择器字符串
//等价于 $('p .dv');
//用$('.dv',context,results)方式获取DOM数组;
//基本选择器
Base.prototype.getId = function(id, results) {
	results = results || [];
	results.push(document.getElementById(id));
	return results;
}
Base.prototype.getTag = function(tag, context, results) {
	results = results || [];
	try {
		results.push.apply(results, context.getElementsByTagName(tag));
	} catch(e) {
		$.mypush(results, context.getElementsByTagName(tag));
	}
	return results;
}
Base.prototype.getClass = function(cls, context, results) {
	results = results || [];
	if(document.getElementsByClassName) {
		results.push.apply(results, context.getElementsByClassName(cls));
	} else {
		this.each($.getTag('*', context), function(i, v) {
			if((' ' + v.className + ' ').indexOf(' ' + cls + ' ') != -1) {
				results.push(v);
			}
		});
	}
	return results;
}
Base.prototype.$ = function(selector, context, results) {
		results = results || [];
		context = context || document;
		var rExp = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))|$/,
			m = rExp.exec(selector),
			_this = this;
		if(m) {
			if(context.nodeType) {
				context = [context];
			}
			if(typeof context == 'string') {
				context = this.$(context);
			}
			this.each(context, function(i, v) {
				if(m[1]) {
					results = _this.getId(m[1], results);
				} else if(m[2]) {
					results = _this.getClass(m[2], v, results);
				} else if(m[3]) {
					results = _this.getTag(m[3], v, results);
				} else if(m[4]) {
					results = _this.getTag(m[4], v, results);
				}
			});
		}
		return results;
	}
//数组（类数组）迭代
Base.prototype.each = function(arr, fn) {
	for(var i = 0; i < arr.length; i++) {
		if(fn.call(arr[i], i, arr[i]) === false) break;
	}
};
//重新实现
//添加class
Base.prototype.addClass = function(className){
    for(var i=0;i<this.elements.length;i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
            this.elements[i].className += ' '+className;
        }
    }
    return this;
}
//移除class
Base.prototype.removeClass = function(className){
    for(var i=0;i<this.elements.length;i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'')
        }
    }
    return this;
}

/*****************************功能性方法的封装***********************************/
//添加改写CSS样式
Base.prototype.css = function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length ==1){
            return getStyle(this.elements[i],attr)+'px';
        }
        this.elements[i].style[attr] = value;
    }
    return this;
}
//获取和设置元素的innerHTML
Base.prototype.html = function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length ==0){
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}
//触发点击事件
Base.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
}
//获取element
Base.prototype.getElement = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};
//设置鼠标移入移出方法
Base.prototype.hover = function(over,out){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//设置显示
Base.prototype.show = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
}
//设置隐藏
Base.prototype.hide = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
}
//跨浏览器获取Style
Base.prototype.getStyle = function(element,attr){
    var value;
    if(typeof window.getComputedStyle!='undefined'){
        value = parseInt(window.getComputedStyle(element,null)[attr]);
    }
    else if(typeof  element.currentStyle !='undefined'){
        value = parseInt(element.currentStyle[attr]);
    }
    return value;
}
//设置动画
Base.prototype.animate = function(attr,step,target,time){
    for(var i=0;i<this.elements.length;i++) {
        var element = this.elements[i];
        var timer = setInterval(function () {
            element.style[attr] = getStyle(element, attr) + step + 'px';
            if(getStyle(element,attr)==target)clearInterval(timer);
        }, time);
    }
    return this;
}
