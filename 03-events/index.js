const EventEmitter = require('events')
const { stdin } = require('process')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click){
    console.log('um usuario clicou', click)
})

/*
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function () {
    meuEmissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)
*/

//FORMA CORRETA DE SE UTILIZAR EVENTOS
const sdin = process.openStdin()
stdin.addListener('data', function (value){
    console.log(`Voce digitou: ${value.toString().trim()}`)
})

//FORMA ERRADA DE SE UTILIZAR EVENTOS
/*
const stdin = process.openStdin()

function main(){
    return new Promise(function (resolve, reject){
        stdin.addListener('data', function (value){
            return resolve(value)
        })
    })
}
main().then(function (resultado){
    console.log('resultado', resultado.toString())
})
*/