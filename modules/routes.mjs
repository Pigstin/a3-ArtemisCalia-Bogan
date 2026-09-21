import { ObjectId } from 'mongodb'
import { AppData } from './data.mjs'

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
        // added to server here
        const result = await options.col.insertOne( req.body )

        // go through data and amend to add order field
        let data = await options.col.find({}).toArray()
        let appdata = new AppData(data)
        appdata.orderEntries()
        appdata.entries.forEach( async (element) => {
            console.log(element)
            await options.col.updateOne(
                { _id: new ObjectId( element._id ) },
                { $set:{ order:element.order } }
            )
        });

        res.json( result )
    }
}

export function remove(options) {
    // assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
    return async (req,res) => {
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