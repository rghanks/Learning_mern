const express = require("express");
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/', (req, res)=> {
    console.log(req.body);
    res.status(200).json({
        status : "success",
        data : { msg1 : req.body.msg1,
                 msg2 : req.body.msg2
               } 
    });
})


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
