const Koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParser = require("koa-bodyparser") //获取带参数值
const passport = require('koa-passport') //验证token
const koaStatic = require("koa-static") //加载静态资源
const path = require("path")
const views = require("koa-views")
// const sendfile  = require("koa-sendfile")


//config
const db = require("./config/keys").mongoURI

//路由
const users = require("./routes/api/users")
const profile = require("./routes/api/profile")
const posts = require("./routes/api/posts")


//实例化koa
const app = new Koa();
const router = new Router();

app.use(bodyParser())

//路由
// router.get("/", async ctx => {
//     ctx.body = { msg: "hello word" }
// })

//执行前端静态页面
// if (process.env.NODE_ENV === 'production') {
app.use(koaStatic(path.join(__dirname, './client/build/')))
// }



app.use(views(path.resolve(__dirname, './client/build'), { extension: "html" }))
app.use(async (ctx, next) => {
    await next()
})


//连接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoose success")
    })
    .catch(err => {
        console.log(err);
    })

//配置路由地址
router.use("/api/users", users)
router.use("/api/profile", profile)
router.use("/api/posts", posts)

app.use(passport.initialize())
app.use(passport.session())

//回调到config文件中 passport.js
require("./config/passport")(passport)


//配置路由
app.use(router.routes()).use(router.allowedMethods());

router.all(/\.js/i, koaStatic(path.resolve(__dirname, './client/build')))
router.all("*", async ctx => {
    await ctx.render('index')
})

const post = process.env.PORT || 12306;

app.listen(post, () => {
    console.log("server loading...")
})