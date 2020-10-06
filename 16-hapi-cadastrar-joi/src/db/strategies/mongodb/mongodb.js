const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state
            await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }

    static connect() {
        Mongoose.connect('mongodb://marcospinho:minhasenhasecreta@localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexão', error)
            })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!!!'))
        return connection
      
    }

    create(item) {
        return this._schema.create(item)
    }

    read(item, skip=0, limit=10) {
        //skip -> se o skip foi 10 ele vai ignorar os 10 primeiros resultados
        //skip-> se eu der skip em 2 em uma lista de 10 itens, eu trago os 8 restantes
        //skip e limit servem para paginar nossos itens
        return this._schema.find(item).skip(skip).limit(limit)
    }
    update(id, item){
       // console.log('id', id)
        return this._schema.updateOne({ _id: id}, {$set: item })
    }
    delete(id) {
        return this._schema.deleteOne( { _id : id})
    }
}

module.exports = MongoDB