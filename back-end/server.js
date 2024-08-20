express = require('express')
cors = require('cors')

app = express()

app.use(cors())
app.use(express.json())

app.use('*', (req, res)=>{
    return res.status(200).json({message: 'Hi, how are you?'})
})

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})

