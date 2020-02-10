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