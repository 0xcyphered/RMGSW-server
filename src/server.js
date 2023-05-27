require("dotenv").config();
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const contractController = require("./controllers/contract.controller");
const originConfig = require("./config/origin.config");

originConfig.VALID_ORIGINS.forEach((origin) => {
  contractController.updateData(origin);
  setInterval(() => contractController.updateData(origin), 1000 * 60 * 5);
});

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/assets.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "certs/privkey.pem"), "utf8"),
//     cert: fs.readFileSync(path.join(__dirname, "certs/cert.pem"), "utf8"),
//     ca: fs.readFileSync(path.join(__dirname, "certs/chain.pem"), "utf8"),
//   },
//   app
// );

httpServer.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}.`)
);
// httpsServer.listen(443, () => console.log("HTTPS Server running on port 443"));
