import Database from '../index';
 
let repository = Database.getRepository();
 
let UltimiArticoliService = {

    // Salvo gli articoli
    saveUltimiArticoli: function(ultimi){
        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('UltimiArticoli', ultimi);
        })
        return true;
    },

    // Recupero i valori in base al loro ID
    findTitoloByID: function(id) {
        articolo = repository.objects('UltimiArticoli').filtered('id == $0',id) 
        for(let p of articolo){
            return p.title
        }
    },

    findImageByID: function(id) {
        articolo = repository.objects('UltimiArticoli').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image
        }
    },

    findImage2ByID: function(id) {
        articolo = repository.objects('UltimiArticoli').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image2
        }
    },

    findAbstractByID: function(id) {
        articolo = repository.objects('UltimiArticoli').filtered('id == $0',id) 
        for(let p of articolo){
            return p.abstract
        }
    },

    findPublishDateByID: function(id) {
        articolo = repository.objects('UltimiArticoli').filtered('id == $0',id) 
        for(let p of articolo){
            return p.publish_date
        }
    },

    // Recupero gli articoli in base alla data
    findArticoliPerData: function(dataCercata) {
        articolo = repository.objects('UltimiArticoli').filtered('publish_date == $0',dataCercata) 
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image,image2: p.image2,publish_date: p.publish_date,TitleBlocks1: p.TitleBlocks1,DescriptionBlocks1: p.DescriptionBlocks1,abstract2: p.abstract2,TitleBlocks2: p.TitleBlocks2,DescriptionBlocks2: p.DescriptionBlocks2})
        }
        return idTrovati
    },

    // Recupero gli articoli
    findArticoli: function(){
        articolo = repository.objects('UltimiArticoli')
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image, category: p.category})
        }
        return idTrovati
    },

    // Recupero le date di pubblicazione degli articoli
    findDatePubblicazione: function(){
        date = repository.objects('UltimiArticoli')
        dateTrovate = []
        dateTrovate.push('DATA')
        for(let p of date){
            // Creo un oggetto che contiene i campi che mi interessano
            dateTrovate.push(p.publish_date)
        }
        return dateTrovate
    },

    // Recupero gli articoli per il mercato immmobiliare
    findLastTreArticoli: function() {
        articolo = repository.objects('UltimiArticoli')
        idTrovati = []
        ultimiTreArticoli = []
        for(let p of articolo){
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract2,abstract: p.abstract,image: p.image, image2: p.image2, TitleBlocks1: p.TitleBlocks1, DescriptionBlocks1: p.DescriptionBlocks1, TitleBlocks2: p.TitleBlocks2, DescriptionBlocks2: p.DescriptionBlocks2})
        }
        for(let i=0; i<3; i++){
            ultimiTreArticoli.push(idTrovati[i])
        }
        return ultimiTreArticoli
    }

};

export default UltimiArticoliService;