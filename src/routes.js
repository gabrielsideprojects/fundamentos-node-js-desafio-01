import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [{
    method: 'GET',
    path:buildRoutePath('/task'),
    handler: (req, res)=> {
        const {search} = req.query
        const users = database.select('tasks',search ?  {
            title: search,
            description: search
        }: null)

        return res.end(JSON.stringify(users))
    }
},
{
    method: 'POST',
    path:buildRoutePath('/task'),
    handler: (req, res)=> {
        const {title, description} = req.body
        const user = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        database.insert('tasks', user)

        return res.writeHead(201).end()
    }
},
{
    method: 'DELETE',
    path:buildRoutePath('/task/:id'),
    handler:(req,res)=> {
        const { id } = req.params

        database.delete('tasks', id)

        return res.writeHead(204).end()
        }
},
{
    method: 'PUT',
    path:buildRoutePath('/task/:id'),
    handler:(req,res)=> {
        const { id } = req.params
        const { title, description, completed_at, created_at, updated_at} = req.body
        database.update('tasks', id, {
            id,
            title,
            description,
            completed_at,
            created_at,
            updated_at
        })

        return res.writeHead(204).end()
        }
},
{
    method: 'PATCH',
    path:buildRoutePath('/task/:id/complete'),
    handler:(req,res)=> {
        const { id } = req.params
        database.updatePatch('tasks', id, {
           completed_at: new Date().toISOString()
        })
        return res.writeHead(204).end()
        }
}
]   