import { eq } from "drizzle-orm"
import { db } from "./db"
import { urlTable } from "./schema"

import express from "express"
const postgres = require("postgres")

const app = express()

app.use(express.json())
const DB_URL = "postgresql://apple:apple@localhost:5432/url_shortener_db"

const urlMap = new Map(); //short to long
const longUrlsSet = new Set()

let count = 0;
const path = "http://localhost:3000"

// app.post("/api/redirect", (req, res) => {
//     const searchParams = req.query
//     console.log("Search Params", searchParams)
//     let url = "";
//     if (searchParams.short) {
//         url = getLongUrl(searchParams.short);
//         // url = searchParams.short;
//     }
//     else if (searchParams.long) {
//         url = searchParams.long;
//     }

//     console.log("Redirecting to this absolute path: " + url)
//     res.redirect("//" + url);  
// })

app.post("/api/shorten", async (req, res) => {
    // const longUrl = req.params.url;
    if (!req.body.url) {
        res.status(400).send({"error": "Bad Request - URL not provided"})
    }
    // if (longUrlsSet.has(req.body.url)) {
    //     res.status(403).send({
    //         "message": "This URL has already been shortened"
    //     })
    // }

    try {
        const inserted = await db.insert(urlTable).values({
            longUrl: req.body.url
        }).returning();
        res.send(path + "/url/" + inserted[0].id);
    } catch (error) {
        console.error(error);
        res.status(400).send("Bad Request");
    }
})

app.get("/url/:id", async (req, res) => {
    console.log("req.path is " + req.path)
    const shortUrlId = req.params.id
    const record = await db.query.urlTable.findFirst({
        where: eq(urlTable.id, parseInt(shortUrlId)),
        with: {
            cardDetails: true,
        }
    })
    if (!record) {
        res.status(404).send({
            "error": "url not found"
        })
    }
    else
        res.redirect("//" + record.longUrl)
})

// const setShortUrl = (longUrl) => {
//     //add to urlMap

//     //handle duplicates
//     console.log(urlMap)
//     let shortUrl = ""
//     if (!longUrlsSet.has(longUrl)) {
//         console.log("shortening now")
//         count++;
//         shortUrl = "/url/" + count.toString()
//         urlMap.set(shortUrl, longUrl);
//     }
//     return shortUrl
// }

// const getLongUrl = (shortUrl) => {
//     if (!urlMap.has(shortUrl)) {
//         console.log("This url doesnt exist in shortened urls")
//         return ""
//     }

//     else {
//         return urlMap.get(shortUrl)
//     }
    
// }

app.listen(3000, () => {
    console.log("Server started at port 3000")
})



