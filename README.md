1. client 文件是react前端页面
2. koa 后端写的服务器


```javascript
//解决koa静态加载react打包文件后，部署到服务器刷新页面找不到问题

const koaStatic = require("koa-static") //加载静态资源
const views = require("koa-views")  //

app.use(koaStatic(path.join(__dirname, './client/build/')))

app.use(views(path.resolve(__dirname, './client/build'), { extension: "html" }))
app.use(async (ctx, next) => {
    await next()
})
router.all(/\.js/i, koaStatic(path.resolve(__dirname, './client/build')))
router.all("*", async ctx => {
    await ctx.render('index')
})
```

3. 部署到线上的地址 https://thawing-plateau-97724.herokuapp.com

4. ##### 如果有人能访问，请你不要乱注册数据，体验玩请你删除掉数据，本人使用的数据的mlab线上免费数据库使用内存有限，部署的服务器在heroku 上，访问时间可能有点长，谢谢大佬的！！！！！











有点小激动，前端，后端第一次自己做，有点粗糙，前端样式布局有点难看，大体功能都实现了！！！！！！！！！！