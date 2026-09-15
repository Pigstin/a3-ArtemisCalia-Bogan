import { ObjectId } from 'mongodb'
// const {ObjectId} = require('mongodb')

export function index(req, res) {
    res.render('pages/index')
}

export function docs(options) {
    return async (req, res, next)=>{
        if (options.col !== null) {
            const docs = await options.col.find({}).toArray()
            res.json( docs )
        }  
    }
}

export function add(options) {
    return async (req, res, next)=>{ 
        const result = await options.col.insertOne( req.body )
        res.json( result )
    }
}

export function remove(options) {
    // assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
    return async (req,res) => {
        console.log(req.body)
        const result = await options.col.deleteOne({ 
            _id: new ObjectId( req.body.id ) 
        })
        res.json( result )
    }
}

export function update(options) {
    return async (req,res) => {
        console.log(req.body)
        const result = await options.col.updateOne(
            { _id: new ObjectId( req.body.id ) },
            { $set:{ name:req.body.name } }
        )
        res.json( result )
    }
}