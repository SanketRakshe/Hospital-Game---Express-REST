const express = require('express');

const app = express();

const PORT = 3000;

const users = [{
    name: "John",
    kidneys: [{
        Healthy: false
    }]
}];


app.use(express.json());


// Get - Get the data from the server
// Get the number of healthy, unHealthy and total count of kideneys from the server
app.get('/', function(req, res) {
    const johnKideney = users[0].kidneys;
    console.log(johnKideney);

    const noOfKideneys = johnKideney.length;

    let noOfHealthyKideneys = 0;

    for(let i=0; i<johnKideney.length; i++) {
        if(johnKideney[i].Healthy) {
            noOfHealthyKideneys = noOfHealthyKideneys + 1;
        }
    }

    const noOfUnhealthyKideneys = noOfKideneys - noOfHealthyKideneys;

    res.json({
        noOfKideneys,
        noOfHealthyKideneys,
        noOfUnhealthyKideneys
    })
});

// POST - send data in the body
// Every time we make a POST request the kidney is added
app.post('/', function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        Healthy: isHealthy
    })

    res.json({
        msg: "POST done"
    })
});


//PUT - User can replace a kideny, make it healthy
app.put('/', function(req, res) {
    for(let i=0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].Healthy = true;
    }

    res.json({
        msg: "PUT done!!"
    });
});


// DELETE - user can remove a unHealthy kidneys
app.delete("/", function(req, res){

    if(isThereAtLeastOneUnhealthyKidney()){
        
        const newKidneys = [];
        for(let i =0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].Healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "DELETE Done!"
        }); 
    }else{
        res.status(411).json({
            msg: "You have no bad Kidneys"
        });
    }

})


// only if atleast one unhealty kidney is there else return 411
function isThereAtLeastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].Healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}



app.listen(PORT, function() {
    console.log(`Your server is listening at http://localhost:${PORT}`);
})