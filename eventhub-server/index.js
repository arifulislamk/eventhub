const express = require("express")
const cors = require("cors") ;
app = express()
const port = process.env.PORT || 3000 ;
app.use(cors());

app.get('/',(req,res) => {
    res.send("hello developer");
})
app.listen(port, () => {
    console.log(`EventHub Running On Port ${port}`) ;
})