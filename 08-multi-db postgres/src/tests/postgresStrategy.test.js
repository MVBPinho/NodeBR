//utilizo o assert para validar as variaveis
//validar se os objetos estão conforme as minhas necessidades
const assert = require ('assert')
const Postgres = require ('./../db/strategies/postgres')
const Context = require ('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
    })
    it('PostgresSQL Connection', async function () {
        const {dataValues: {nome, poder}}  = await context.isConnected()
        assert.strictEqual({nome, poder}, true)
    })
    //it.only() vai ser executado apenas o cadastrar
    it.only('cadastrar', async function () {
       const {dataValues: {nome, poder}} = await context.create(MOCK_HEROI_CADASTRAR)
       assert.deepStrictEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
})