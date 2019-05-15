const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Product } = require("../../models/Product")

const { userAuth } = require("../../middlewares/auth")
const { modAccess, adminAccess } = require("../../middlewares/access")

// upload
const multer  = require('multer')
const storage = multer.diskStorage({
     //dest folder
    destination: function(req,file,cb){
        cb(null, "uploads")
    },
    //rename file
    filename: function(req,file,cb){
        cb(null, Number(new Date()) + '_' + file.originalname)
    }
})
const fileFilter = (req,file,cb) => {
    //file type
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true)
    }else{
        //null or new Error('message')
        cb(null,false)
    }
}
const upload = multer({
    storage, 
    limits: {
        //max file size
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

//localhost:3005/api/admin/products
router.post("/",userAuth,modAccess,upload.single("image"),function(req,res){
    const body = _.pick(req.body,["name","price","category","description","availabeDateTime","stock","codEligible","image"])
    body.category === 'null' && delete body.category
    body.codEligible === 'null' && delete body.codEligible
    if(req.file){
        body.image = req.file.filename
    }
    console.log(req.file)
    const product = new Product(body)
    product.save()
        .then(function(product){
            res.send(product)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/products/:id
router.put("/:id",userAuth,modAccess,upload.single("image"),function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["name","price","category","description","availabeDateTime","stock","codEligible","image"])
    if(req.file){
        body.image = req.file.filename
    }
    Product.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        .then(function(product){
            res.send(product)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/products/:id
router.delete("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then(function(product){
            if(product){
                res.send({product})
            }else{
                res.status("404").send({
                    notice: "page not found"
                })
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    adminProductRouter: router
}