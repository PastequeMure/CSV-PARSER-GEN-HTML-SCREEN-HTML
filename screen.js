const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

async function generateScreenshots() {
    try {
        const htmlDir = path.join(__dirname, 'html');
        const files = await fs.readdir(htmlDir);

        const htmlFiles = files.filter(file => file.endsWith('.html'));

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const viewportWidth = 1920;
        const viewportHeight = 1080;

        await page.setViewport({ width: viewportWidth, height: viewportHeight });

        for (const file of htmlFiles) {
            const filePath = path.join(htmlDir, file);
            const outputFilePath = path.join(__dirname, 'screens', `${path.basename(file, '.html')}.png`);

            await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

            await page.screenshot({ path: outputFilePath, fullPage: true });

            console.log(`Capture d'écran prise pour ${file}: ${outputFilePath}`);
        }

        await browser.close();
        console.log('Toutes les captures d\'écran ont été prises.');

    } catch (err) {
        console.error('Erreur lors de la génération des captures d\'écran:', err);
        throw err;
    }
}

fs.mkdir(path.join(__dirname, 'screens'), { recursive: true })
    .then(() => {
        generateScreenshots().catch(err => {
            console.error('Erreur:', err);
        });
    })
    .catch(err => {
        console.error('Erreur lors de la création du répertoire des captures d\'écran:', err);
    });
