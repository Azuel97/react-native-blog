import Database from '../index';
 
let repository = Database.getRepository();
 
let CategorieService = {

    findCategoria: function(categoria){
        return repository.objects('Categorie').filtered('title == $0',categoria)
    },

    // Salvo gli articoli
    saveArticoliSlider: function(category){
        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('Categorie', category);
        })
        return true;
    },

    // Recupero i valori in base al loro ID
    findTitoloByID: function(id) {
        articolo = repository.objects('Categorie').filtered('id == $0',id) 
        for(let p of articolo){
            return p.abstract
        }
    },

    findImageByID: function(id) {
        articolo = repository.objects('Categorie').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image
        }
    },

    findCategoriaByID: function(id) {
        articolo = repository.objects('Categorie').filtered('id == $0',id) 
        for(let p of articolo){
            return p.title
        }
    },

    // Ricerca tramite Title
    findTitoloByName: function(name) {
        categoria = repository.objects('Categorie').filtered('title == $0',name)
        for(let p of categoria){
            return p.abstract
        }
    },

    findImageByName: function(name) {
        categoria = repository.objects('Categorie').filtered('title == $0',name)
        for(let p of categoria){
            return p.image
        }
    },

    findCategoriaByName: function(name) {
        categoria = repository.objects('Categorie').filtered('title == $0',name)
        for(let p of categoria){
            return p.title
        }
    }

};

export default CategorieService;