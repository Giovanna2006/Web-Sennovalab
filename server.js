const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.end ('Bienvenidos al servidor backend Node.js. Corriendo...')
})

//configurar server basico
app.listen(5000, function(){
    console.log ('el servidor NODE sennovalab2 esta corriendo correctamente')
})

