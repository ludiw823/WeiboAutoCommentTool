# WeiboAutoCommentTool

微博自动评论工具。

*给自家哥哥刷数据用。。。*

## 说明
自动评论某一条指定微博，评论内容从列表中随机选取。[原版本代码](https://github.com/mrhuo/WeiboAutoCommentTool)

## 使用方法

* 登录微博
* 在崽的个人主页feed流中找到你想要评论的微博，对照最下列表找到id
* F12打开浏览器控制台，把脚本内容全部复制粘贴到控制台，按回车
* 然后执行以下代码（注意在执行的时候，必须保持你想评论的那条微博位于你的浏览器窗口内）：
* 注意如果要多次运行的话，在`weiboAutoCommentTool.start()`前要先运行`weiboAutoCommentTool.stop()`

**test模式：每轮3个评论，间隔10s，一共3轮，每轮之间间隔2分钟**
```
//注意每轮评论间隔必须 大于 每轮评论个数*评论时间间隔
weiboAutoCommentTool.start({
  //评论间隔时间，默认为10秒
  delay: 10*1000,
  //评论内容从列表中随机抽取
  //每轮评论个数
  count: 3,
  //需要评论的微博post的id，默认是10月30日ctm的post
  id: 4433033908049230,
  //每轮评论间隔,默认为2分钟
  interval: 2*60*1000,
  //评论总轮数,默认为3轮
  outCount: 3
});
```

**模式1：每轮27个评论，间隔10s，一共30轮，每轮之间间隔10分钟**
```
weiboAutoCommentTool.start({
  delay: 10*1000,
  count: 27,
  //这里id是11-05施耐德电气视屏
  id: 4435192674584756,
  interval: 10*60*1000,
  //评论总轮数,默认为3轮
  outCount: 30
});
```

**模式2：每轮27个评论，间隔20s，一共8轮，每轮之间间隔20分钟**
```
weiboAutoCommentTool.start({
  delay: 20*1000,
  count: 27,
  //这里id是11-05施耐德电气视屏
  id: 4435192674584756,
  interval: 20*60*1000,
  //评论总轮数,默认为3轮
  outCount: 8
});
```

## 其他工具
```
//停止自动评论
weiboAutoCommentTool.stop()
```

## 测试日志（下列记录来自控制台复制）
```
//will update soon
```

## id对照

### 置顶微博 19-10-30 come to me 新歌宣传
`4433033908049230`

![](/PostScreenShot/191030.jpg)

### 19-11-05 施耐德电气 家是啥 视频
`4435192674584756`

![](/PostScreenShot/191105.png)

### 19-11-04 上海九图摇滚小毛驴
`4434918497237330`

![](/PostScreenShot/191104.png)

### 19-11-01 我们恋爱吧小作文
`4433950325342593`

![](/PostScreenShot/191101.jpg)

### 19-10-31 Helloween吃糖三连拍
`4433602664719030`

![](/PostScreenShot/191031-2.png)

### 19-10-31 转发FASHIONABLE杂志
`4433456627428723`

![](/PostScreenShot/191031-1.png)

### 19-10-28 新歌预告两张大长腿
`4432352031401526`

![](/PostScreenShot/191028.png)

### 19-10-25 我们恋爱吧小作文
`4431412218359249`

![](/PostScreenShot/191025.png)

### 19-10-20 重庆演唱会九图
`4429459626706804`

![](/PostScreenShot/191020.png)

### 19-10-18 我们恋爱吧小作文
`4428876836913341`

![](/PostScreenShot/191018.png)

### 19-10-17 转发微博
`4428423852150761`

![](/PostScreenShot/191017.png)

### 19-10-17 爱心大使
`4428370898778274`

![](/PostScreenShot/191017-1.png)

### 19-10-13 南京演唱会九图
`4426956055211251`

![](/PostScreenShot/191013.png)

### 19-10-12 读给祖国听
`4426582954930614`

![](/PostScreenShot/191012.png)

### 19-10-11 我们恋爱吧小作文
`4426340059345746`

![](/PostScreenShot/191011.png)

### 19-10-10 转发 时光的旋律 军港之夜
`4425901586211735`

![](/PostScreenShot/191010.png)

### 19-10-09 机场墨镜黄卫衣 耶
`4425527848421567`

![](/PostScreenShot/191009.png)

### 19-10-08 新麦写真
`4425190903792071`

![](/PostScreenShot/191008.png)

### 19-10-07 镇江户外音乐节九图
`4424765521400290`  

![](/PostScreenShot/191007.png)

### 19-10-06 白帽衫九连拍可可爱爱惹
`4424479398514224`

![](/PostScreenShot/191006.png)

### 19-10-05 机上墨镜自拍
`4424081422035163`

![](/PostScreenShot/191005.png)

### 19-10-04 我们恋爱吧小作文
`4423794195908555`

![](/PostScreenShot/191004.png)

### 19-10-01 国庆与渔夫帽与双肩背
`4422674921007002`

![](/PostScreenShot/191001-2.png)

### 19-10-01 看阅兵的背影
`4422524228499319`

![](/PostScreenShot/191001-1.png)
