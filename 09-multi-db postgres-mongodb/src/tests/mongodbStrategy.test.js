const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super Teia'
}
const context = new Context(new MongoDb())
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
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
    it.only('listar', async () =>{
        //posso extrair a posição 1, 2 e 3
        //const [pos1, pos2, pos3] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})

        //vou extrair a primeira posição e só irei extrair o nome e poder
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
            nome, poder
        }
        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT)
    })
})