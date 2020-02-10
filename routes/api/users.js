//登陆注册接口
const Router = require("koa-router")
var gravatar = require('gravatar'); //获取全球公认头像
const bcrypt = require("bcryptjs")//密码加密
const jwt = require('jsonwebtoken') //生成token插件

const tools = require("../../config/tools").enbcrypt //密码加密函数
const keys = require("../../config/keys") //生成token key

const passport = require("koa-passport")

//引入验证
const validateRegisterInput = require("../../validation/register") //注册
const validateLoginInput = require("../../validation/login")    //登陆

const router = new Router();

//引入数据模板User
const User = require("../../models/User")

/**
 * @route GET api/users/test
 * @gesc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test", async ctx => {
    ctx.status = 200;
    ctx.body = { msg: "suer worke" }
})

/**
 * @route GET api/users/register
 * @gesc 注册接口地址
 * @access 接口是公开的
 */
router.post("/register", async ctx => {

    const { errors, isValid } = validateRegisterInput(ctx.request.body)
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    //存储到数据库
    const findResult = await User.find({ email: ctx.request.body.email });
    const nameResult = await User.find({ name: ctx.request.body.name })
    if (findResult.length > 0) {
        ctx.status = 500;
        ctx.body = { email: "邮箱已存在" }
    } else if (nameResult.length > 0) {
        ctx.status = 500;
        ctx.body = { name: '名字已存在' }
    } else {
        const avatar = gravatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' })
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: tools(ctx.request.body.password),
            avatar: avatar
        })
        await newUser.save().then(user => {
            ctx.body = user
        })
            .catch(err => {
                console.log(err)
            })

        //返回json数据
        ctx.body = newUser
    }
})

/**
 * @route GET api/users/login
 * @gesc 登陆接口地址 返回token
 * @access 接口是公开的
 */

router.post("/login", async ctx => {
    const { errors, isValid } = validateLoginInput(ctx.request.body)
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    //查询邮箱
    const findResult = await User.find({ email: ctx.request.body.email })
    const password = ctx.request.body.password;
    const user = findResult[0];

    if (findResult.length == 0) {
        ctx.status = 404;
        ctx.body = { email: "用户不存在" }
    } else {
        var result = await bcrypt.compareSync(password, user.password);
        if (result) {
            //返回token
            const payload = { id: user.id, name: user.name, avatar: user.avatar };
            const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 })

            ctx.status = 200;
            ctx.body = { success: '登陆成功', token: "Bearer " + token };
        } else {
            ctx.status = 400;
            ctx.body = { password: "密码错误" }
        }
    }

})

/**
* @route GET api/users/current
* @gesc 用户信息接口地址 返回用户信息 
* @access 接口是私密
*/
router.get("/current", passport.authenticate('jwt', { session: false }), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar,
    }
})


module.exports = router.routes();