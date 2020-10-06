/*sudo docker ps

sudo docker exec -it mongodb \
    mongo -u marcospinho -p minhasenhasecreta --authenticationDatabase herois */

//databases
show dbs

//mudando o contexto para uma database especifica
use herois

// mostrando tables (coleções)
show collections 

//Inserir no  banco
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//Listar todo mundo
db.herois.find()
//lista formatado
db.herois.find().pretty()

for(let i=0; i <= 100000; i ++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

//Tras o número maximo dos registros
db.herois.count()

//Trás 1 registro da base
db.herois.findOne()

//Traga 1000 registros ordenados pelo nome, ascendent (do menor para o maior no caso)
db.herois.find().limit(1000).sort({ nome: -1})

//para verificar os outros registros, não vai dar para ver os 1000 registros de uma vez
it

// trazer uma coluna especifica, no caso vai trazer somente o poder e ocultar o id
// por padrão ele trás o que eu quero e o id, para não trazer o id eu coloco 0
db.herois.find({}, {poder: 1, _id:0})

//---------------------create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//--------------------read
db.herois.find()
db.herois.find({ nome: 'Flash'})
db.herois.find({nome: 'Mulher Maravilha'})
db.herois.findOne({ _id: ObjectId("5f6e4dde1c1f935acba13c2c") })


//--------------------update
db.herois.update({  _id: ObjectId("5f6e4d3f1c1f935acba1151c") },
{
    nome: 'Mulher Maravilha'
} )

/*
    o mongo tem um problema no update
    no caso de cima eu pedi para ele alterar o nome e ele alterou tudo
    em outras palavras, eu tinha as colunas, NOME, PODER, DATANASCIMENTO e agora
    só tenho o nome

    para alterar somente a coluna nome, eu tenho que passar o comando
    $set: {nome: ...} 
    nesse caso eu alteraria somente o nome
*/
db.herois.update({  _id: ObjectId("5f6e4dde1c1f935acba13c2c") }, 
{ $set: {nome: 'Lanterna Verde' }})

/*
    se eu errar o nome da propriedade, ele cria um campo novo
    por exemplo, se eu errar o NOME para NAME 
    ele vai criar um campo novo

    no update ele vai alterar o primeiro que ele encontrar.
    Por exemplo, se eu for alterar todo mundo que tem o poder Velocidade, ele vai 
    alterar só o primeiro que for encontrado
*/
db.herois.update({ poder: 'Velocidade' }, { $set: {poder: 'Super Força'}})
// É case sensitive
// Fiz um teste, colocando Super força e deu erro, porque o F no caso deveria
// ser maiusculo
db.herois.find({ poder: 'Super Força' }).limit(1000).sort({ nome: -1})


//----------------------delete
// o comando abaixo vai remover todos da base
db.herois.remove({})
db.herois.remove({ nome: 'Mulher Maravilha'})