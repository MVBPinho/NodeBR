const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        //console.log('result', result)
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar /herois - deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })
    it('listar /herois - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        assert.deepStrictEqual(result.payload, 'Erro interno no servidor')
    })
    it('listar /herois - deve filtar um item', async () => {
        const NAME = 'Homem Aranha-1601347568729'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })
})