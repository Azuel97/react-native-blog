import Database from '../index';
 
let repository = Database.getRepository();
 
const UltimiArticoliController = {

    // Salvo gli articoli
    saveUltimiArticoli: function(ultimi){
        // Se esistono di già gli articoli allora non vengono aggiunti, e ritorna false
        if (repository.objects('UltimiArticoli').filtered(" id = '" + ultimi.id + "'").length) 
            return false;

        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('UltimiArticoli', ultimi);
        })
        return true;
    },

    // Recupero gli articoli
    findArticoli: function(){
        articolo = repository.objects('UltimiArticoli')
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image, categoria: p.category})
        }
        return idTrovati
    },

};

export default UltimiArticoliController;