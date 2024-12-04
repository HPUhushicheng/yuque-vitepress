const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/docs');
const dataFilePath = path.join(__dirname, '../docs/content/data.ts');

function getMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.md'));
}

function generateData() {
    const folders = fs.readdirSync(docsDir);
    const data = folders.map(folder => {
        const folderPath = path.join(docsDir, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const markdownFiles = getMarkdownFiles(folderPath);
            const items = markdownFiles.map(file => {
                const title = path.basename(file, '.md');
                return {
                    title: title,
                    link: `/docs/${folder}/${title}`
                };
            });
            return {
                title: folder,
                items
            };
        }
        return null;
    }).filter(item => item !== null);

    return data;
}

function updateDataFile(data) {
    const dataContent = `export const NAV_DATA = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataFilePath, dataContent, 'utf8');
    console.log('数据插入完成.');
}

const data = generateData();
updateDataFile(data);