var Userdb = require('../model/model')

// create and save new user
exports.create=(req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: 'Content can not be empty!'})
        return 
    }

    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in database
    user
        .save(user)
        .then(data =>{
            // res.send(data) // just to check post request
            res.redirect('/add-user') 
        })
        .catch(err =>{
            res.status(500).send({message: err.message || 'Some error occured while creating a create operation'})
        })
}

// retrive and return all users/ retrive and return single user(for this we use query parameters)
exports.find=(req,res)=>{

    if(req.query.id){
        // for retrival of single data
        const id = req.query.id

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message: 'Not found user with id: '+id})
                }
                else
                {
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message: 'error retriving user with id: '+id})
            })
    }
    else
    {   // for retrival of all data
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || 'Error occured while retriving user information'})
        })
    }
}

// update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message: 'Data to update can not be empty'})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot Update user with ${id}.Maybe user not found`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: err.message || 'Error Update user information'})
        })
}

// delete a user with specified user id in the request
exports.delete=(req,res)=>{
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot Delete withid ${id}. Maybe id is wrong`})
            }
            else{
                res.send({
                    message: 'User was deleted successfully!'
                })
            }
        })
        .catch(err =>{
            res.status(500).send({message: 'Could not delete User with id = '+id})
        })
}