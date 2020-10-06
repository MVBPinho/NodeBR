//Sempre que eu for utilizar o extends no JS eu tenho que chamar a classe pai
// antes de qualquer coisa para depois setar

const BaseRoute = require('./base/baseRoute')
const Joi = require('@hapi/joi')
const failAction = (request, headers, erro) => {
    throw erro;
}
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            method: 'GET',
            path: '/herois',
            handler: (request, headers) => {
                try {
                    const {
                        skip,
                        limit,
                        nome } = request.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return "Erro interno no servidor"
                }
            },
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {
                        nome, 
                        poder
                    } = request.payload
                    const result = await this.db.create({
                        nome, 
                        poder
                    })
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return 'Internal Error!'
                }
            }
        }
    }
}

module.exports = HeroRoutes