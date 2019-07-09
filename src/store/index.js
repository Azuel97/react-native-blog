import Realm from 'realm';
 
let repository = new Realm({
    path: 'remax.realm',
    schema: [
        {
            name: 'ArticoliSlider',
            primaryKey : 'id',
            properties: {
                id: 'int',
                titolo: 'string',
                image: 'string',
                categoria: 'string'
            }
        },
        {
            name: 'ArticoliMercato',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                abstract: 'string',
                abstract2: 'string',
                image: 'string',
                image2: 'string',
                publish_date: 'string',
                TitleBlocks1: 'string',
                DescriptionBlocks1: 'string',
                TitleBlocks2: 'string',
                DescriptionBlocks2: 'string'
            }
        },
        {
            name: 'ArticoliCredito',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                abstract: 'string',
                abstract2: 'string',
                image: 'string',
                image2: 'string',
                publish_date: 'string',
                TitleBlocks1: 'string',
                DescriptionBlocks1: 'string',
                TitleBlocks2: 'string',
                DescriptionBlocks2: 'string'
            }
        },
        {
            name: 'ArticoliCuriosita',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                abstract: 'string',
                abstract2: 'string',
                image: 'string',
                image2: 'string',
                publish_date: 'string',
                TitleBlocks1: 'string',
                DescriptionBlocks1: 'string',
                TitleBlocks2: 'string',
                DescriptionBlocks2: 'string'
            }
        },
        {
            name: 'Categorie',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                abstract: 'string',
                image: 'string'
            }
        },
        {
            name: 'ArticoloEvidenza',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                abstract: 'string',
                image: 'string',
                category: 'string'
            }
        },
        {
            name: 'UltimiArticoli',
            primaryKey : 'id',
            properties: {
                id: 'int',
                title: 'string',
                image: 'string',
                publish_date: 'string',
                category: 'string'
            }
        },
    ],
    schemaVersion: 14,
});
 
let Database = {
    getRepository: function(){
        console.log("db path: ", repository.path);
        return repository;
    }
};
 
export default Database;