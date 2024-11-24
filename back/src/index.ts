//index.ts

import { AppDataSource } from "./config/data.source"
import { PORT } from "./config/env"
import server from "./server"

import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection succesful")
        server.listen(PORT, () => {
            console.log(`Server listen on port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err)
    })

//////////////////////////////////////////////////////
