const fs = require('fs').promises;
const path = require('path');

const csvPath = path.join(__dirname, './Feuille de calcul sans titre - Feuille 1.csv');
const templatePath = path.join(__dirname, './template/html.html'); 

async function generateHTML() {
    try {
        const data = await fs.readFile(csvPath, 'utf-8');
        
        const products = data.split('\n').filter(line => line.trim() !== '');
        
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        for (let i = 0; i < products.length; i++) {
            const datas = products[i].replace(/["]/g,"").replace(/\r/g,"").split(",");

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

            const productName = datas[1].toLowerCase().replace(/ /g, '-').replace(/[*/.]/g,"_"); 
            const htmlFileName = `${productName}.html`; 
            await fs.writeFile('./html/'+htmlFileName, productHTML);
        }
        
        console.log('Génération de fichiers HTML terminée.');

    } catch (err) {
        console.error('Error while generating HTML:', err);
        throw err;
    }
}

generateHTML().catch(err => {
    console.error('Error:', err);
});
