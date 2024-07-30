import express from "express"

const app =express()

const port=3000

app.use("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,(err)=>{
console.log(`port connected successfully on port ${port}`);

})