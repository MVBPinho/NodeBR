// npm i hapi
// npm i hapi-auth-jwt2

const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDÃO_123'

async function main() {
    
    const app = await new Hapi.Server({
        host: 'localhost',
        port: 5001
    })

    function mapRoutes(instance, methods) {
        return methods.map(method => instance[method]())
    }

    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: 'v1.0'
        },
    };

    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        //options: {
          //  expiresIn: 20
        //},
        validate: (dados, request) => {
            // verifica no banco se o usuário continua ativo
            // verifica no banco se o usuário continua pagando

            return {
                isValid : true // caso não valido false
            }
        }
    })
    app.auth.default('jwt')

    try {
        await app.start();
        console.log('Server running at:', app.info.uri);
    } catch (err) {
        console.log(err);
    }

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}


module.exports = main()