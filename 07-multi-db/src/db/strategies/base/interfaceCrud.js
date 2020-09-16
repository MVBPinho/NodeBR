//por padrão no javascript toda vez que eu extender uma classe eu tenho que 
//chamar o seu construtor também

class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}
//o create é só uma assinatura
class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

//Boas praticas para ser visualizado pelos outros projetos
//dessa forma eu deixo publico
module.exports = ICrud