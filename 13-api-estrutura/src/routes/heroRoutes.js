//Sempre que eu for utilizar o extends no JS eu tenho que chamar a classe pai
// antes de qualquer coisa para depois setar

const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

 
}

module.exports = HeroRoutes