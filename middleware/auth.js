var auth = require('basic-authorization-header');



const verifyAuth = (req,res, next) => {
    
    const secret = auth('secretkey')

    if(!req.headers['authorization']){
       return res.status(401).json({ message: 'unauthorized' })
    }

    const basic = req.headers['authorization'].startsWith('basic')

    if(!basic) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    const token = req.headers['authorization'].split(' ')[1]
    
     if(!token.includes('c2VjcmV0a2V5Og==') ) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    next()
}

module.exports = { verifyAuth }