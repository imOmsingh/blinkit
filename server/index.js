
        const express = require("express");
        const next = require("next");
        const mongoose = require("mongoose");
        const bodyParser = require("body-parser");
        const path = require("path");
        const dev = process.env.NODE_ENV !== "production";
        const PORT = process.env.PORT || 80;
        const app = next({ dev });
        const handle = app.getRequestHandler();
        
        app
          .prepare()
          .then(() => {
            const cors = require("cors");
            const server = express();
            const userRoute = require("./routes/User");
            const uploadRoute = require("./routes/Upload");





            server.use(
              cors({
                origin: "http://localhost:80",
              })
            );
            server.use(express.json());
            server.use(bodyParser.json());
            server.use(bodyParser.urlencoded({ extended: true }));
              
            //connection
            const connection = mongoose
              .connect(
                "mongodb+srv://omsingh200310:omsingh@cluster0.dnpdtx2.mongodb.net/test"
              )
              .then(console.log("Database Connected"))
              .catch((err) => {
                console.log(err);
              });
            if (!connection) {
              return "Could not connect to server";
            }

            server.use('/api/user',userRoute)
            server.use('/api/upload',uploadRoute)

            
            server.get("*", (req, res) => {
              return handle(req, res);
            });
        
            server.listen(PORT, (err) => {
              if (err) throw err;
              console.log("> Ready on http://localhost:80");
            });
          })
          .catch((ex) => {
            console.error(ex.stack);
            process.exit(1);
          });
        
        