const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const secret = require('./middlewares/secret')
const authenticate = require('./middlewares/authenticate')

const app = new Koa()
const router = new Router()
const protectedRouter = new Router()

app.use(bodyParser())
app.use(serve(__dirname + '/public'))
app.use(router.routes()).use(router.allowedMethods())

// Middleware below this line is only reached if JWT token is valid
app.use(secret)
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

router.get('/', (ctx, next) => {
	ctx.body = 'index.html'
})

router.post('/login', authenticate, async (ctx, next) => {
	ctx.body = ctx.authenticateData
})

protectedRouter.get('/users', (ctx, next) => {
	console.log(ctx.state.user)
	ctx.body = { users: [ { name: 'jack' }, { name: 'bob' } ]}
})

app.listen(4000, () => {
	console.log('app is running at 4000....')
})