const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs/promises');

app.set('view engine','ejs');
app.use(express.static('public'));

app.listen(3000, () =>{
    console.log("Listening to Port 3000");
})

app.get('/api/data', async (req, res) => {
    try {

        const data = await fs.readFile('data.json', 'utf8');
        const values = JSON.parse(data);

        res.json(values);

    }
    catch(error) {

        res.status(500).json({
            error: 'Unable to read data'
        });
    }
});

app.get('/',(request,response) =>{
    console.log(`Request made!\nRequest-method: ${request.method} Request_URL: ${request.url} `);
    response.redirect('/data')
})

app.get('/data', async (req,res)=>{ //Observe I have used the async key-word! -> Explained in question_async_await
    try{
        const data = await fs.readFile('data.json','utf8');
        const values = JSON.parse(data);
        res.render('index',{values});
    }
    catch(error){
        console.log(error);
    }
});

app.get('/graphs', async(req,res)=>{
    try{
        const data = await fs.readFile('data.json','utf8');
        const values = JSON.parse(data);
        res.render('graph',{values});
    }
    catch(error){
        res.render('404');
    }
})

app.get('/reference',(request,response)=>{
    response.render('reference');
})

app.use((request,response)=>{
    console.log(`Request made!\nRequest-method: ${request.method} Request_URL: ${request.url} `);
    response.status(404).render('404'); 
});