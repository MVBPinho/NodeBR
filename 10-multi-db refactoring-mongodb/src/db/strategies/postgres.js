const ICrud = require('./interfaces/interfaceCrud')
//npm install pg-hstore pg sequelize
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null,
        this._herois = null
    }

    create(item) {
        return this._herois.create(item)
    }

    async read(item = {}) {
        return this._herois.findAll({ where: item , raw: true })
    }

    async update(id, item) {
        //console.log('id', id)
        //console.log('item', item)
        return this._herois.update(item, {where:{ id: id}})
    }
    
    async delete(id) {
        const query = id ? { id } : {}
        return this._herois.destroy({where: query})
    }

    //Foi criado uma função para conectar com o banco de dados 
    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'marcospinho',
            'minhasenhasecreta', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
            }
        )
        await this.defineModel()
    } 

    //Foi definido o modelo do banco de dados
    //como a tabela vai funcionar
    //sync para sincronizar
    async defineModel () {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            }, 
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false;
        }
    }
} 

module.exports = Postgres