### 欢迎使用markdown 

# 文本格式化 

# 一号标题 

## 二号标题 

### 三号标题 

#### 四号标题 

##### 五号标题 

要创建段落，请使用空行分隔一行或多行文本。不能使用空格或 tab缩进段落

这是一个段落噢

使用两个或多个空格结束一行，然后回车


*斜体写法一* 

_斜体写法二_ 

**粗体写法一** 

__粗体写法二__ 

***加粗的斜体*** 

~~删除线~~ 

> 这里是引用的内容啊
>> 嵌套的引用噢

上面的引用不会自己结束，需要空一行结束引用 

# 代码格式化
`var a ="单行代码"`
```javascript
function 代码的块状显示() {
    alert('hello markdown');
}
```

代码块通常缩进四个空格或一个tab。当它们在列表中时，将它们缩进八个空格或两个tab
1. open the file
2. find the following code block on line 21:
    
        <html>
            <head>
                <title></title>
            </head>
        </html>
           
3. update the title to match the name of your website    
# 无序列表
- 电脑
- 电视
- 电话

# 有序列表
1. 读书
2. 写字

# 嵌套的列表
1. dd
    1. 嵌套列表一
    2. 嵌套列表二

# 嵌套无序列表
1. dd
    - 嵌套无序列表01
    - 嵌套无序列表02




# 多段列表(在列表中添加另一个元素（如段落），同时保留列表的连续性，请将元素缩进四个空格或一个tab：)
1. 列表
    学习markdown很简单 
    我们可以参考

# 链接和图片
## 行内式链接
[链接文本](http://www.wuzhe.online '标题')
欢迎大家访问我的[博客](http://www.wuzhe.online '前端爱我')

## 参考式的链接
先定义在使用 

定义方式 

[blog]: http://www.wuzhe.online "前端爱我" 

使用方式 

[博客](blog)
## 格式化链接  
要强调链接，请在括号和括号前后添加*  

I love supporting **[前端爱我](http://www.wuzhe.online)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.

## 网址和电子邮件地址

<http://www.wuzhe.online>  

<wuzhe_@aliyun.com>


## 行内式图片
![天坛](https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2708803286,1622788977&fm=26&gp=0.jpg "天坛图片")




## 参考式图片
[pic]:https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2708803286,1622788977&fm=26&gp=0.jpg "天坛图片" 
![天坛][pic] 

## 目录 

[toc]  

## 脚注

先定义再使用

[^name]: 周树人

[^ren]: 狂人日记 


鲁迅[^name]的代表作[^ren]之一

## 表格
|姓名|性别|年龄|分数|
|----|----:|----|----|
|张三|男|19|89|
|李四|女|20|90|

# 水平线
***  

# 让特殊字符语法显示为普通字符
使用\转义让其显示为原本的字符串形式  

\*没有\，这里将是无序列表


    

