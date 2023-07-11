
const { Router } = require('express')
const { google } = require('googleapis')
const  fs = require('fs-extra')
const  path =  require('path')
const { verifyAuth } = require('../middleware/auth')

const router = Router()

const oauth2Client  = new google.auth.OAuth2(
  CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET ,
  REDIRECT_URL = process.env.REDIRECT_URL
)

oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const drive = google.drive({
  version:'v3',
  auth:oauth2Client
})

router.post('/api/uploadfile', verifyAuth, async (req,res) => {

 
 try {
    const response = await drive.files.create({
     requestBody: {
       name: req.file.originalname,
       mimeType:'image/png',  
     },
     media: {
       mimeType:'image/png',
       body: fs.createReadStream(path.resolve('./public/uploads/'+req.file.filename)), 
     }
    })
    const { id } = response.data

    await drive.permissions.create({
      fileId:id,
      requestBody:{
        role:'reader',
        type:'anyone'
      }
    })
    await fs.unlink(path.resolve('./public/uploads/'+req.file.filename))
    res.json({ url: `https://drive.google.com/uc?export=view&id=${id}`, id })

 } catch (error) {

    res.json(error.message)
 } 

  

})

router.delete('/api/deletefile/:id', verifyAuth, async(req,res) => {
  try {
     await drive.files.delete({
      fileId: req.params.id
    })
     res.json({ message:'image was deleted' })
 } catch (error) {
     res.json({ err:error.message })
 }
})


module.exports = router 