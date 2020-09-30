const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super Teia'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}
let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))
        
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Conectado'

        assert.deepStrictEqual(result, expected)
    })
    it('cadastrar', async () => {
        const { nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepStrictEqual({nome,poder}, MOCK_HEROI_CADASTRAR)

    })
    it('listar', async () =>{
        //posso extrair a posição 1, 2 e 3
        //const [pos1, pos2, pos3] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})

        //vou extrair a primeira posição e só irei extrair o nome e poder
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
            nome, poder
        }
        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT)
    })
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'PernaLonga'
        })
        assert.deepStrictEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepStrictEqual(result.n, 1)
    })
})