//Treehouse FullStack Project 7: A Static Website for Projects. 

//A. Required Modules. 

const express = require('express');
const app = express();
const dataJSON = require('./data.json'); 
const path = require('path');

//B. Setting pug up. 

app.set('view engine', 'pug'); 

//C. Serving the static files. 

app.use('/static', express.static('public'));  


//D. Routing middleware

app.get('/', (req, res) => {    
    let data = dataJSON.projects;
    res.locals.projects = data; 
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');  
});


app.get('/project/:id', (req, res, next) => {
    const id = parseInt(req.params.id) - 1; 
    if (id <= 5 ) {
        const project = {
            name :  dataJSON.projects[id].project_name,
            description :  dataJSON.projects[id].description,
            technologies :  dataJSON.projects[id].technologies,
            live_link : dataJSON.projects[id].live_link,
            github_link : dataJSON.projects[id].github_link,
            image_urls : dataJSON.projects[id].image_urls
            }
        res.locals.project = project;
        res.render('project1');
    } 
    else {
        let err = new Error('404: This project does not exist yet'); 
        err.statusCode = 404; 
        next(err);
    }  
})


//E. Error Handling Middleware. 

app.get('*', (req, res, next) => { 
    err = new Error('404 Error: Not found.')
    err.statusCode = 404; 
    next(err);
});

app.use((err, req, res, next) => {
    if (err.statusCode !== undefined) {
        console.log(err.message);
        console.log(err.statusCode)
        next(err);
    } else {
        err.message = 'Error 500: Something went wrong!'
        err.statusCode = 500;
        console.log(err.message);
        console.log(err.statusCode);
        next(err); 
    }
})

//F. Setting up a static html server: 

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});



