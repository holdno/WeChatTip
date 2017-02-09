/*****************************
一个简单的微信小程序事件订阅及广播方法

首先在页面的onLoad方法通过obj.on方法进行订阅
然后通过obj.emit进行事件广播
最后在页面的onUnload方法中通过obj.off方法注销事件
*****************************/

var eventListener = {
	// 是否开启试调模式
	debug: true,
	// 创建对象容器
	_store: [],
	// 发布者
	// event: 事件名称  data: 传递参数
	emit (event, data) {
	    var store = this._store
	    var eventLength = store.length
	    for (var i = 0; i < eventLength; i++) {
		if(event == store[i].event){
		    this._store[i].callback(data)
		    break
		}
		if (i >= eventLength) {
		    if (this.debug) console.error('Emit error: The event is not defined')
		}
	    }
	},
	// 订阅者
	// event: 事件名称  method: function实例
	on (event, method) {
	    var store = this._store
	    var eventLength = store.length
	    for (var i = 0; i < eventLength; i++) {
		if (event === store[i].event) {
		    if (this.debug) console.error('Listener error: The event name is existed')
		    return false
		}
	    }
	    if (event && method) {
		if (this.debug) console.log("Add new listener: " + event)
		    var newListener = {
			event: event,
			callback: method
		    }
		this._store.push(newListener)
	    } else {
		if (this.debug) console.warn("The two argument must not be empty")
	    }
	},
	// 取消订阅
	// event: 方法名称
	off (event) {
	    var store = this._store
	    var eventLength = store.length
	    var offSuccess = 0
	    for (var i = 0; i < eventLength; i++) {
		if(event === store[i].event){
		    store.splice(i, 1)
		    offSuccess = 1
		}
	    }
	    if (this.debug) {
		if (offSuccess === 1) {
		    console.log("Remove listener: " + event)
		} else {
		    console.error("Remove listener error:" + event + ' is not defined')
		}
	    }
	}
}

// 打包模块
module.exports = eventListener

// 在小程序中是用 var holdnoListener = require (holdnoEventListener.js) 引入


