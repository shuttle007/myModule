/*拖拽组件*/
var Drag = function(obj) {
	this.oDiv = obj;
	this.dixX = 0;
	this.disY = 0;
	var _this = this;
	this.oDiv.onmousedown = function() {
		_this.fnDown(); //注意要有括号
	};
};

Drag.prototype.fnDown = function(e) {
	var _this = this;
	var oEvent = e || event;
	this.disX = oEvent.clientX - this.oDiv.offsetLeft;
	this.disY = oEvent.clientY - this.oDiv.offsetTop;
	document.onmousemove = function() {
		_this.fnMove();
	};
	document.onmouseup = function() {
		_this.fnUp();
	};
}
Drag.prototype.fnMove = function(e) {
	var oEvent = e || event,
		l = oEvent.clientX - this.disX,
		t = oEvent.clientY - this.disY,
		s1 = document.documentElement.clientWidth - this.oDiv.offsetWidth,
		s2 = document.documentElement.clientHeight - this.oDiv.offsetHeight;
	if(l < 0) {
		l = 0;
	} else if(l > s1) {
		l = s1;
	}
	if(t < 0) {
		t = 0;
	} else if(t > s2) {
		t = s2;
	}
	this.oDiv.style.left = l + "px";
	this.oDiv.style.top = t + "px";
}
Drag.prototype.fnUp = function() {
	document.onmousemove = null;
	document.onmouseup = null;
}