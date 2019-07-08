import Database from '../index';
 
let repository = Database.getRepository();
 
let ArticoliMercatoService = {

    findAllArticle: function(){
        return repository.objects('ArticoliMercato')
    },

    saveArticoliMercato: function(mercato){
        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('ArticoliMercato', mercato);
        })
        return true;
    },

    findTitoloByID: function(id) {
        articolo = repository.objects('ArticoliMercato').filtered('id == $0',id) 
        for(let p of articolo){
            return p.title
        }
    },

    findImageByID: function(id) {
        articolo = repository.objects('ArticoliMercato').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image
        }
    },

    findImage2ByID: function(id) {
        articolo = repository.objects('ArticoliMercato').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image2
        }
    },

    findAbstractByID: function(id) {
        articolo = repository.objects('ArticoliMercato').filtered('id == $0',id) 
        for(let p of articolo){
            return p.abstract
        }
    },

    findPublishDateByID: function(id) {
        articolo = repository.objects('ArticoliMercato').filtered('id == $0',id) 
        for(let p of articolo){
            return p.publish_date
        }
    },

    findArticoliPerData: function(dataCercata) {
        articolo = repository.objects('ArticoliMercato').filtered('publish_date == $0',dataCercata) 
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image,image2: p.image2,publish_date: p.publish_date,TitleBlocks1: p.TitleBlocks1,DescriptionBlocks1: p.DescriptionBlocks1,abstract2: p.abstract2,TitleBlocks2: p.TitleBlocks2,DescriptionBlocks2: p.DescriptionBlocks2})
        }
        return idTrovati
    },

    findArticoli: function(){
        articolo = repository.objects('ArticoliMercato')
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image,image2: p.image2,publish_date: p.publish_date,TitleBlocks1: p.TitleBlocks1,DescriptionBlocks1: p.DescriptionBlocks1,abstract2: p.abstract2,TitleBlocks2: p.TitleBlocks2,DescriptionBlocks2: p.DescriptionBlocks2})
        }
        return idTrovati
    },

    findDatePubblicazione: function(){
        date = repository.objects('ArticoliMercato')
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
        articolo = repository.objects('ArticoliMercato')
        idTrovati = []
        ultimiTreArticoli = []
        for(let p of articolo){
            //console.log('Lunghezza : ' + articolo.length)
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract2,abstract: p.abstract,image: p.image, image2: p.image2, TitleBlocks1: p.TitleBlocks1, DescriptionBlocks1: p.DescriptionBlocks1, TitleBlocks2: p.TitleBlocks2, DescriptionBlocks2: p.DescriptionBlocks2})
        }
        for(let i=0; i<3; i++){
            ultimiTreArticoli.push(idTrovati[i])
        }
        //console.log(idTrovati)
        //console.log(ultimiTreArticoli)
        return ultimiTreArticoli
    }



};

export default ArticoliMercatoService;