const axios = require('axios') // allow us to make get request

exports.homeRoutes = (req,res)=>{
    // Make a get request to/api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        console.log(response.data)
        res.render('index',{users: response.data}) // along with ejs file we will also render data 
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.add_user = (req,res)=>{
    res.render('add_user')
}

exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params: {id: req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user: userdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}