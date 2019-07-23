import Database from '../index';
 
let repository = Database.getRepository();
 
const ArticoliCreditoController = {

    // Salvo gli articoli
    saveArticoliCredito: function(mercato){
        // Se esistono di già gli articoli allora non vengono aggiunti, e ritorna false
        if (repository.objects('ArticoliCredito').filtered(" id = '" + mercato.id + "'").length) 
            return false;

        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('ArticoliCredito', mercato);
        })
        return true;
    },

    // Recupero i campi in base al loro ID
    findTitoloByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.title
        }
    },

    findImageByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image
        }
    },

    findAbstractByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.abstract
        }
    },

    findImage2ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.image2
        }
    },

    findTitleBlocks1ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.TitleBlocks1
        }
    },

    findDescriptionBlocks1ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.DescriptionBlocks1
        }
    },

    findabstract2ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.abstract2
        }
    },

    findTitleBlocks2ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.TitleBlocks2
        }
    },

    findDescriptionBlocks2ByID: function(id) {
        articolo = repository.objects('ArticoliCredito').filtered('id == $0',id) 
        for(let p of articolo){
            return p.DescriptionBlocks2
        }
    },

    // Recupero gli articoli in base alla data passata 
    findArticoliPerData: function(dataCercata) {
        articolo = repository.objects('ArticoliCredito').filtered('publish_date == $0',dataCercata) 
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image,image2: p.image2,publish_date: p.publish_date,TitleBlocks1: p.TitleBlocks1,DescriptionBlocks1: p.DescriptionBlocks1,abstract2: p.abstract2,TitleBlocks2: p.TitleBlocks2,DescriptionBlocks2: p.DescriptionBlocks2})
        }
        return idTrovati
    },

    // Recupero tutti gli aeticoli
    findArticoli: function(){
        articolo = repository.objects('ArticoliCredito')
        idTrovati = []
        for(let p of articolo){
            // Creo un oggetto che contiene i campi che mi interessano
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract,image: p.image,image2: p.image2,publish_date: p.publish_date,TitleBlocks1: p.TitleBlocks1,DescriptionBlocks1: p.DescriptionBlocks1,abstract2: p.abstract2,TitleBlocks2: p.TitleBlocks2,DescriptionBlocks2: p.DescriptionBlocks2, categoria: 'Credito'})
        }
        return idTrovati
    },

    // Recupero le date di pubblicazione degli articoli
    findDatePubblicazione: function(){
        date = repository.objects('ArticoliCredito')
        dateTrovate = []
        dateTrovate.push('DATA')
        for(let p of date){
            // Creo un oggetto che contiene i campi che mi interessano
            dateTrovate.push(p.publish_date)
        }
        return dateTrovate
    },

    // Recupero gli articoli per il credito
    findLastTreArticoli: function() {
        articolo = repository.objects('ArticoliCredito')
        idTrovati = []
        ultimiTreArticoli = []
        for(let p of articolo){
            idTrovati.push({id: p.id,title: p.title,abstract: p.abstract2,abstract: p.abstract,image: p.image, image2: p.image2, TitleBlocks1: p.TitleBlocks1, DescriptionBlocks1: p.DescriptionBlocks1, TitleBlocks2: p.TitleBlocks2, DescriptionBlocks2: p.DescriptionBlocks2})
        }
        for(let i=0; i<3; i++){
            // Salvo un oggetto che contiene i primi tre articoli, quindi l'oggetto è di dimensione 3
            ultimiTreArticoli.push(idTrovati[i])
        }
        return ultimiTreArticoli
    }

};

export default ArticoliCreditoController;