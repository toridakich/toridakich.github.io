const express = require('express');
const logger = require('./api/utilities/logger');
const app = express();
const evalRoute = require('./api/routes/evalRoute');
const userRoute = require('./api/routes/userRoute');
const userPermissionRoute = require('./api/routes/userPermissionRoute');
var cors = require("cors");
  
app.use(logger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  
  //Routes:

app.use("/api/eval", evalRoute);
app.use("/api/user", userRoute);
app.use("/api/permission", userPermissionRoute);

const port = process.env.PORT || 5000;  
app.listen(port);

console.log('fs-scout RESTful API server started on: ' + port);
