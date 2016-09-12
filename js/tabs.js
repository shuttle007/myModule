var Tabs = function(obj) {
	var top = $.$(".top",obj)[0];
	this.btns = $.$("li",top);
	var center = $.$(".center",obj)[0];
	this.lists = $.$("ul",center);
	var _this = this;
	for(var i = 0; i < this.btns.length; i++) {
		this.btns[i].index = i;
		this.btns[i].onclick = function() {
			_this.switch(this);
		}
	}
};
Tabs.prototype.switch = function(obj) {
	for(var i = 0; i < this.btns.length; i++) {
		this.btns[i].className = "";
	}
	for(var i = 0; i < this.lists.length; i++) {
		this.lists[i].style.display = "none";
	}
	obj.className += "active";
	this.lists[obj.index].style.display = "block";
}