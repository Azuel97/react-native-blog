import Database from '../index';
 
let repository = Database.getRepository();
 
const ArticoloEvidenzaController = {

    // Salvo gli articoli
    saveArticoliEvidenza: function(evidenza){
        // Se esistono di già gli articoli allora non vengono aggiunti, e ritorna false
        if (repository.objects('ArticoloEvidenza').filtered(" id = '" + evidenza.id + "'").length) 
            return false;

        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('ArticoloEvidenza', evidenza);
        })
        return true;
    },

    // Recupero tutti gli articoli
    findArticoli: function(){
        articolo = repository.objects('ArticoloEvidenza')
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image, category: p.category})
        }
        return idTrovati
    }

};

export default ArticoloEvidenzaController;