//npm i mongoose

const Mongoose = require('mongoose')
Mongoose.connect('mongodb://marcospinho:minhasenhasecreta@localhost:27017/herois',  
    { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
        if(!error) return;
        console.log('Falha na conexão', error)
    })

const connection = Mongoose.connection

/*
function nomeFuncao() {

}

const minhaFuncao = function() {

}

const minhaFuncaoArrow = (params) => console.log(params)

*/

connection.once('open', () => console.log('database rodando!!!'))
/*
setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
}, 1000)
*/

/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectado
*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('items,', listItens)
}
main()