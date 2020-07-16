/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu ID
2 Obter o endereco do usuario pelo Id
*/
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
    //Quando der algum problema -> REJECT (ERRO)
    //Quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
           // return reject(new Error('DEU RUIM DE VERDADE'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                numero:'11002123',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
            return callback(null, {
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000);
}

//1o passo adicionar a palavra async -> automaticamente ela retornará uma promise
main()
async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
      //  const telefone = await obterTelefone(usuario.id)
      //  const endereco = await obterEnderecoAsync(usuario.id)
      const resultado = await Promise.all([
          obterTelefone(usuario.id),
          obterEnderecoAsync(usuario.id)
      ])
      const endereco = resultado[1];
      const telefone = resultado[0];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.numero},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }catch(error){
        console.error('DEU RUIM', error)
    }
}
/*
const usuarioPromise = obterUsuario()
//Para manipular o sucesso usamos a função .the
//Para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}), ${resultado.telefone.numero}
        `)
    })
    .catch(function (error){
        console.log('DEU RUIM', error)
    })

    
obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0 == false
    if(error){
        console.error('DEU RUIM em USUARIO', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error1('DEU RUIM em TELEFONE', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.error2('DEU RUIM em ENDERECO', error)
                return;
            }
            console.log(`
            NOME: ${usuario.nome},
            ENDERECO: ${endereco.rua}, ${endereco.numero},
            TELEOFNE: (${telefone.ddd}, ${telefone.numero}`)
        })
    })
})
*/