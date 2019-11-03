# WeiboAutoCommentTool

微博自动评论工具。

*给自家哥哥刷数据用。。。*

## 说明
自动评论某一条指定微博，评论内容从列表中随机选取。[原版本代码](https://github.com/mrhuo/WeiboAutoCommentTool)

## 使用方法

* 登录微博
* 在崽的个人主页feed流中找到你想要评论的微博，对照最下列表超找到id
* F12打开浏览器控制台，把脚本内容全部复制粘贴到控制台，按回车
* 然后执行以下代码（注意在执行的时候，必须保持你想评论的那条微博位于你的浏览器窗口内）：
* 注意如果要多次运行的话，在`weiboAutoCommentTool.start()`前要先运行`weiboAutoCommentTool.stop()`

test模式：每轮3个评论，间隔10s，一共3轮，每轮之间间隔2分钟
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

模式1：每轮27个评论，间隔10s，一共30轮，每轮之间间隔10分钟
```
weiboAutoCommentTool.start({
  delay: 10*1000,
  count: 27,
  id: 433033908049230,
  interval: 10*60*1000,
  //评论总轮数,默认为3轮
  outCount: 30
});
```

模式2：每轮27个评论，间隔20s，一共8轮，每轮之间间隔20分钟
```
weiboAutoCommentTool.start({
  delay: 20*1000,
  count: 27,
  id: 433033908049230,
  interval: 20*60*1000,
  //评论总轮数,默认为3轮
  outCount: 8
});


## 其他工具
```
//停止自动评论
weiboAutoCommentTool.stop()
```

```
//查看评论统计待更新
```

## 测试日志（下列记录来自控制台复制）
```
//will update soon
```

## id对照

### 置顶微博 19-10-30 come to me 新歌宣传
`4433033908049230`
![](/PostScreenShot/191033.jpg)