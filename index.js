const express = require("express");
const router = require("./route/phone");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/phoneMart", router);

app.get("/", (req, res) => {
    res.status(200).json({
        name: "Welcome to the homepage"
    });
})



async function start(PORT) {
    try {  
        app.listen(PORT, () => {
            console.log(`server started successfully at port : ${PORT}`);
        })
    } catch (error) {
        console.log(`Custom error : ${error}`);
    }
}

start(PORT);