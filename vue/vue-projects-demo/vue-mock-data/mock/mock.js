// 引入mockjs
 const Mock = require('mockjs')
 // 获取 mock.Random 对象
 const Random = Mock.Random
 // mock一组数据
 const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
	  // 自增的唯一标识
	  id: '@increment',
	  // 随机生成一段5到30个字的中文文本
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      // 生成一段随机的Base64图片编码
	  thumbnail_pic_s: Random.dataImage('100x100', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      // 随机生成一个常见的中文姓名
	  author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      // Random.date(format): 返回一个随机的日期字符串；format参数，指示生成的日期字符串的格式
	  // Random.time(format): 返回一个随机的时间字符串；format参数，指示生成的时间字符串的格式
	  date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(Mock.mock(newArticleObject))
  }
  return {
    data: articles
  }
 }

 const listData = function () {
   return Mock.mock({
    'list|1-10': [
      {
        'id|+1': 1,
        'age|18-30': 1,
        'salary|10000-20000.2-4': 1,
        'isFE|1': true,
        'ary|1': [1,2,3,,4],
        'fn': function () { alert(123) },
        'regexp1': /[a-z][A-Z][0-9]/,
      }
    ]
  })
 }

 // 拦截ajax请求，配置mock的数据
 Mock.mock('/api/test', 'get', produceNewsData)
 /*
   1、Mock.mock
   rurl: 拦截的URL或URL正则
   rtype: 表示需要拦截的Ajax请求类型
   template: 数据模板，可以是对象或字符串
   function(options)：表示用于生成相应数据的函数
   Mock.mock(rurl, rtype, template)
   options指向本次请求的Ajax选项集，含有url、type和body三个属性
   Mock.mock(rurl, rtype, function(options))  

   2、Mock.setup
   // 配置拦截Ajax请求时的行为。支持的配置项有：timeout
   Mock.setup(settings)
   Mock.setup({
     timeout: 400
   })

   3、Mock.Random；是一个工具类，用于生成各种随机数据
   Mock.Random的方法在数据模板中成为[占位符]，书写格式为@占位符(参数[,参数])
   var Random = Mock.Random
   Random.email()
   Mock.mock('@email')
   Mock.mock({ email: '@email' })
   
 */
 Mock.mock('/api/list', 'get', listData)