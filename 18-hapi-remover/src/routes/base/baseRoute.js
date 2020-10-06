// Todo mundo que for utilizar a classe de rotas tem que extender essa classe
// quero pegar todos os nomes de propriedade que estiverem no this.prototype
// Quem está na classe, quem são os membros, quem está ali
// vou trazer todos os métodos diferente do construtor e que não são privados

class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute