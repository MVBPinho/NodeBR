const ICrud = require('./../interfaces/interfaceCrud')
//npm install pg-hstore pg sequelize
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection,
            this._schema = schema
    }

    create(item) {
        return this._schema.create(item)
    }

    async read(item = {}) {
        return this._schema.findAll({ where: item, raw: true })
    }

    async update(id, item) {
        //console.log('id', id)
        //console.log('item', item)
        return this._schema.update(item, { where: { id: id } })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({ where: query })
    }

    //Foi criado uma função para conectar com o banco de dados 
    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'marcospinho',
            'minhasenhasecreta', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            operatorsAliases: false,
            logging: false
            }
        )
        return connection
    }

    //Foi definido o modelo do banco de dados
    //como a tabela vai funcionar
    //sync para sincronizar
    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false;
        }
    }
}

module.exports = Postgres