import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleWare";
const blogRouter = new Hono();

blogRouter.use('*',authMiddleware)

blogRouter.get('/middlewareTest',(c)=>{
    return c.json({message: "Middleware is working"})
})

// blogRouter.post('/',(c)=>{

// })
// blogRouter.put('/',(c)=>{

// })
// blogRouter.get('/:id',(c)=>{

// })
// blogRouter.get('/bluk',(c)=>{

// })

export default blogRouter;