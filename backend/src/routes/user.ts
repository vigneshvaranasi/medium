import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
import { jwt, sign } from 'hono/jwt'
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    if (!body.email || !body.password) {
        return c.json({ error: 'Email and password are required' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
        email: body.email
        }
    })
    if (existingUser) {
        return c.json({ error: 'User already exists' })
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const user = await prisma.user.create({
        data: {
        email: body.email,
        password: hashedPassword
        }
    })
    // Generate JWT token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET)
    console.log('jwtToken: ', jwtToken)
    console.log('user: ', user)
    return c.json({
        message: 'User created successfully',
        jwt: jwtToken
    })
})

userRouter.post('/signin', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    if (!body.email || !body.password) {
        return c.json({ error: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    console.log('user: ', user);

    if (!user) {
        return c.json({ error: 'Invalid email' })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(body.password, user.password)
    if (!isPasswordValid) {
        return c.json({ error: 'Invalid password' })
    }
    // Generate JWT token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET)
    console.log('jwtToken: ', jwtToken)
    console.log('user: ', user)
    return c.json({
        message: 'User signed in successfully',
        jwt: jwtToken
    })
})
export default userRouter
