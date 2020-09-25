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
const MOCK_HEROI_ATUALIZAR= {
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
        //limpar a base, para evitar ter uma base suja
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSQL Connection', async function () {
        const {dataValues: {nome, poder}}  = await context.isConnected()
        assert.strictEqual({nome, poder}, true)
    })
    //it.only() vai ser executado apenas o cadastrar
    it('cadastrar', async function () {
       const {dataValues: {nome, poder}} = await context.create(MOCK_HEROI_CADASTRAR)
       assert.deepStrictEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function () {
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome })
        //pegar a primeira posição
        //const posicaoZero = result[0]
        // const [posicao1, posicao2] = ['esse é o 1', 'esse é o 2']
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function () {
        //o [result] significa que vai ter uma lista e eu vou armazenar na
        // primeira variavel
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            // ... quebra o objeto em chaves e coloca no mesmo nivel do objeto
            // que estou passando

            //se eu tirar os 3 pontos eu tenho um novo item
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read( { id: itemAtualizar.id})
        //não é boas práticas fazer várias asserções
        // para um mesmo teste
        assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome)
        /*
        No Javascript temos uma tecnica chamada rest/spread que é um metodo
        usado para mergear objetos ou separa-lo
        {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        {
            dataNascimento: '1998-01-01'
        }

        //final
        {
            nome: 'Batman',
            poder: 'Dinheiro',
            dataNascimento: '1998-01-01'
        }
        */
  })
  it.only('remover por id', async function () {
      const [item] = await context.read({})
      const result = await context.delete(item.id)
  })
})