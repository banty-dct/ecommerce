const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Category } = require("../../models/Category")

const { userAuth } = require("../../middlewares/auth")
const { modAccess, adminAccess } = require("../../middlewares/access")

//localhost:3000/admin/categories
router.post("/",userAuth,modAccess,function(req,res){
    const body = _.pick(req.body,["name"])
    const category = new Category(body)
    category.save()
        .then(function(category){
            res.send({
                category,
                notice: "Successfully created category"
            })
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Failed to create"
            })
        })
})

//localhost:3000/admin/categories/:id
router.put("/:id",userAuth,modAccess,function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["name"])
    Category.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        .then(function(category){
            res.send({
                category,
                notice: "Successfully updated"
            })
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Failed to update"
            })
        })
})

//localhost:3000/admin/categories/:id
router.delete("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then(function(category){
            if(category){
                res.send({
                    category,
                    notice: "Successfully deleted"
                })
            }else{
                res.status("404").send({
                    notice: "page not found"
                })
            }
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Failed to delete"
            })
        })
})

module.exports = {
    adminCategoryRouter: router
}