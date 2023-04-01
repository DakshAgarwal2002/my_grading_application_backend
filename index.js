const connectToMongo=require('./db')
const express = require('express')
const port =process.env.PORT || 5000
var cors = require('cors')
const app = express()
 
app.use(cors())
connectToMongo();

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello Daksh!')
// })

app.use('/api',require('./routes/Changes.js'))
// app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Visual Notes Backend listening on port ${port}`)
})