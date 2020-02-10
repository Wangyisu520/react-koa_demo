const bcrypt = require("bcryptjs")//密码加密

const tools = {
    enbcrypt(passowrd){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(passowrd,salt);
        return hash
    }
}

module.exports = tools