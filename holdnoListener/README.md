![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
holdnoListener 微信小程序事件订阅及广播
===================
解决小程序跨页面传参问题</br>
事件订阅及广播</br>
</br>
使用方法：</br>
在app.js中引入并注册
``` javascript
var _store = require('utils/holdnoEventListener.js')
App({
    store: _store
})

```
</br>
工作流程：订阅-发布-注销</br>
已我的小程序为例，有一个城市选择的页面，首页需要根据这个城市来获取相关数据</br>
现在首页index.js的onLoad方法中订阅事件‘cityChange’
``` javascript
// 事件订阅 订阅城市变更事件
app.store.on('cityChange', () => {
  	that.onUnload()
  	that.onLoad()
})
```
on方法的第二个参数也可以传入当前页面的某个方法实例
``` javascript
// 事件订阅 订阅城市变更事件
app.store.on('cityChange', this.cityChange)
```
</br>
然后在城市选择页面变更城市的方法中发布一个事件广播</br>
``` javascript
// 事件广播 通知订阅者城市被变更
app.store.emit('cityChange',{})
```
由于我的业务场景城市这个变量是全局需要的，所以这个变量维护在app.js中的golobalData参数中</br>
所以这里不需要传入内容，大家可以根据自己的实际业务场景进行修改</br>
这个时候我们在首页订阅的事件就会被通知(调用回到函数执行自己的业务逻辑)</br>
</br>
一个跨页面的参数传递流程就走完了</br>
但是要注意在订阅事件页面的onUnload方法中注销订阅，避免造成事件订阅状态的冲突(没有注销的话新同名事件不会被添加)
``` javascript
// 事件注销 卸载页面的时候同时将订阅的事件注销掉
app.store.off('cityChange')
```
大功告成！

