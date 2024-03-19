const Router = require("express");
const getDetails = require("../controller/phone");

const router = Router();

router.get("/",getDetails);


router.get("*",(req,res)=>{
    res.json({
        msg : "oops! wrong url path"
    })
})

module.exports =  router;