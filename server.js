const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get('/getitems', (req,res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  console.log(data);
  res.json(data);
})

app.post('/setitem', (req,res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  console.log(data.items);
  console.log(req.body.newitem);
   
  data.items[data.items.length] = req.body.newitem
  console.log( data);
  
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.status(200).json({msg: "item saved"});
})

app.listen(PORT, ()=>{
  console.log("server is running on localhost:" + PORT);
})
