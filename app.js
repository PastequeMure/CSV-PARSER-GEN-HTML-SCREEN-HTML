const fs = require('fs').promises;
const path = require('path');

const csvPath = path.join(__dirname, './Feuille de calcul sans titre - Feuille 1.csv');
const templatePath = path.join(__dirname, './template/html.html'); // Chemin vers votre fichier HTML template

async function generateHTML() {
    try {
        // Lire le contenu du fichier CSV
        const data = await fs.readFile(csvPath, 'utf-8');
        
        // Traiter les lignes du CSV en tableau de produits
        const products = data.split('\n').filter(line => line.trim() !== '');
        
        // Charger le template HTML
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        // Parcourir chaque produit pour créer un fichier HTML individuel
        for (let i = 0; i < products.length; i++) {
            const datas = products[i].replace(/["]/g,"").replace(/\r/g,"").split(",");

            // Créer le HTML pour chaque produit en utilisant le template
            let productHTML = htmlTemplate
                .replace(/{{name}}/g, datas[1].replace(/[.]/g, ""))
                .replace(/{{ref}}/g, datas[0])
                .replace(/{{eco}}/g, datas[2])
                .replace(/{{old_price.unit}}/g, datas[3])
                .replace(/{{new_price.unit}}/g, datas[5])

            if(datas[4]) {
                productHTML = productHTML.replace(/{{old_price.decimal}}/g, `.${datas[4]}`)
            } else {
                productHTML = productHTML.replace(/{{old_price.decimal}}/g, "")
            }

            if(datas[6]) {
                productHTML = productHTML.replace(/{{new_price.decimal}}/g, datas[6])
            } else {
                productHTML = productHTML.replace(/{{new_price.decimal}}/g, "")

            }

            // Définir le titre du document HTML
            const productName = datas[1].toLowerCase().replace(/ /g, '-').replace(/[*/.]/g,"_"); // Utilisation du nom du produit pour le titre
            const htmlFileName = `${productName}.html`; // Nom du fichier HTML

            // Écrire le fichier HTML pour chaque produit
            await fs.writeFile('./html/'+htmlFileName, productHTML);
            
            //console.log(`Fichier HTML généré pour ${datas[1]}: ${htmlFileName}`);
        }
        
        console.log('Génération de fichiers HTML terminée.');

    } catch (err) {
        console.error('Error while generating HTML:', err);
        throw err;  // Rethrow the error to handle it elsewhere if needed
    }
}

// Utilisation de la fonction pour générer les fichiers HTML individuels
generateHTML().catch(err => {
    console.error('Error:', err);
});
