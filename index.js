var auth = require('basic-authorization-header');
const dotenv  = require('dotenv')

const  path =  require('path')

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const appRouter  = require('./router/route')


dotenv.config()

const app = express()
const port = process.env.PORT || 4200;

const storage = multer.diskStorage({
   destination:path.resolve('./public/uploads'),
   filename: (req, file, cb) =>{
      cb(null, Date.now()+ path.extname(file.originalname))
   }
})

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())
app.use(multer({ storage }).single('image'))

app.use(appRouter)

app.use(express.static(path.resolve('./public')))

app.listen(port)
console.log('Server startup on port 4200')


