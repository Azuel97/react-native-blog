import Database from '../index';
 
let repository = Database.getRepository();
 
const ArticoliController = {

    // Recupero tutti gli articoli
    findAllArticle: function(){
        return repository.objects('ArticoliSlider')
    },

    // Salvo gli articoli
    saveArticoliSlider: function(article){
        // Se esistono di già gli articoli allora non vengono aggiunti, e ritorna false
        if (repository.objects('ArticoliSlider').filtered(" id = '" + article.id + "'").length) 
            return false;

        // Se gli articoli non sono presenti, allora gli aggiungo e torno true
        repository.write(() => {
            repository.create('ArticoliSlider', article);
        })
        return true;
    },

    // Recupero gli articoli per lo slider
    findLastTreArticoli: function() {
        articolo = repository.objects('ArticoliSlider')
        idTrovati = []
        ultimiTreArticoli = []
        for(let p of articolo){
            idTrovati.push({id: p.id,titolo: p.titolo,categoria: p.categoria,image: p.image})
        }
        for(let i=0; i<3; i++){
            ultimiTreArticoli.push(idTrovati[i])
        }
        return ultimiTreArticoli
    }

};

export default ArticoliController;