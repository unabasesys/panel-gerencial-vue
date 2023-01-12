const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
//add this middleware
app.use(history());    
app.use(serveStatic(path.join(__dirname, 'dist')))
var port = process.env.PORT || 3000
app.listen(port)
console.log('server started '+ port) 



// app.use(serveStatic(path.join(__dirname, 'dist')));
// const port = process.env.PORT || 3000;
// app.listen(port);