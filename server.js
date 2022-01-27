const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser =require('body-parser')
const routes = require('./config/routes')
const db = require('./db/db')
const querys = require('./db/querys')
const { response } = require('express')
const { type } = require('express/lib/response')
const port = process.env.PORT || 3000


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(routes)



app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
    
})

