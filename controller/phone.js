const { getdetail, dbRef, getSearchResult ,getPriceFilter} = require("../database/connect");



// Utility functions
async function getDetails(req, res) {
    var data;
    if (Object.keys(req.query).length === 0) {
        data = await getdetail(dbRef);

    } else {
        let key1 = Object.keys(req.query)[0];
        let val1 = req.query[Object.keys(req.query)[0]];
        if(key1==="maxsellprice"){
            data = await getPriceFilter(val1);
        }else{
            data = await getSearchResult(key1, val1);
        }

        // for double searching
        if(Object.keys(req.query).length>1){
            let key2 = Object.keys(req.query)[1];
            let val2 = req.query[Object.keys(req.query)[1]];

            let mod_key2 = key2.charAt(0).toUpperCase() + key2.slice(1);

            if(mod_key2==="Brand"){
                data = data.filter((item)=>{
                    return item[mod_key2] === val2.charAt(0).toUpperCase() + val2.slice(1);
                })
            }else if(mod_key2==="Memory"){
                data = data.filter((item)=>{
                    return item[mod_key2] === val2+" GB";
                })
            }else if(mod_key2==="Rating"){
                data = data.filter((item)=>{
                    return item[mod_key2] === parseFloat(val2);
                })
            }else if(mod_key2==="Storage"){
                data = data.filter((item)=>{
                    return item[mod_key2] === val2+" GB";
                })
            }else if(mod_key2==="Maxsellprice"){
                data = data.filter((item)=>{
                    return item["Selling Price"] <= parseInt(val2);
                })
            }
            else{
                data = null;
            }
        }

        //for triple searching
        if(Object.keys(req.query).length>2){
            let key3 = Object.keys(req.query)[2];
            let val3 = req.query[Object.keys(req.query)[2]];

            let mod_key3 = key3.charAt(0).toUpperCase() + key3.slice(1);

            if(mod_key3==="Brand"){
                data = data.filter((item)=>{
                    return item[mod_key3] === val3.toUpperCase();
                })
            }else if(mod_key3==="Memory"){
                data = data.filter((item)=>{
                    return item[mod_key3] === val3+" GB";
                })
            }else if(mod_key3==="Rating"){
                data = data.filter((item)=>{
                    return item[mod_key3] === parseFloat(val3);
                })
            }else if(mod_key3==="Storage"){
                data = data.filter((item)=>{
                    return item[mod_key3] === val3+" GB";
                })
            }else if(mod_key3==="Maxsellprice"){
                data = data.filter((item)=>{
                    return item["Selling Price"] <= parseInt(val3);
                })
            }
            else{
                data = null;
            }
        }

        //for quadraple search
        if(Object.keys(req.query).length>3){
            let key4 = Object.keys(req.query)[3];
            let val4 = req.query[Object.keys(req.query)[3]];

            let mod_key4 = key4.charAt(0).toUpperCase() + key4.slice(1);

            if(mod_key4==="Brand"){
                data = data.filter((item)=>{
                    return item[mod_key4] === val4.toUpperCase();
                })
            }else if(mod_key4==="Memory"){
                data = data.filter((item)=>{
                    return item[mod_key4] === val4+" GB";
                })
            }else if(mod_key4==="Rating"){
                data = data.filter((item)=>{
                    return item[mod_key4] === parseFloat(val4);
                })
            }else if(mod_key4==="Storage"){
                data = data.filter((item)=>{
                    return item[mod_key4] === val4+" GB";
                })
            }else if(mod_key4==="Maxsellprice"){
                data = data.filter((item)=>{
                    return item["Selling Price"] <= parseInt(val4); 
                })
            }
            else{
                data = null;
            }
        }
    }

    if (data !== null) {
        let newdata = JSON.parse(JSON.stringify(data));
        let obj = {
            "result": 0
        }
        obj["result"] = data.length;
        obj["list-of-models"] = newdata;
        res.status(200).json(obj);
    }else{
        res.status(200).json({
            msg: "Oops! Data Not found!!!"
        });
    }

}


module.exports =  getDetails;