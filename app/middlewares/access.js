const adminAccess = function(req, res, next) {    
    if(req.user.role === "admin"){
        next()
    }else{
        res.status("403").send({
            notice: "the page does not exist"
        })
    }
}

const modAccess = function(req, res, next) {    
    if(req.user.role === "moderator" || req.user.role === "admin"){
        next()
    }else{
        res.status("403").send({
            notice: "the page does not exist"
        })
    }
}

module.exports = {
    adminAccess, modAccess
}