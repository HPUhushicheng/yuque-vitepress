import fs from 'fs';
import path from 'path';

function organizeDocs() {
    const docsPath = './docs'; // 确保路径正确
    const testFilePath = './test.txt'; // 分类结果文件路径
    const categories = {};

    // 读取分类结果文件
    const lines = fs.readFileSync(testFilePath, 'utf-8').split('\n');

    let currentCategory = null;
    for (const line of lines) {
        if (line.startsWith('###')) {
            // 提取分类名称
            currentCategory = line.replace('###', '').trim();
            categories[currentCategory] = [];
        } else if (line.startsWith('-')) {
            // 提取文件名
            const fileName = line.replace('-', '').trim().replace(/`/g, '');
            if (currentCategory) {
                categories[currentCategory].push(fileName);
            }
        }
    }

    // 创建分类文件夹并移动文件
    for (const [category, files] of Object.entries(categories)) {
        const categoryPath = path.join(docsPath, category.replace(/\s+/g, '_'));
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath);
        }

        for (const file of files) {
            const oldPath = path.join(docsPath, file);
            const newPath = path.join(categoryPath, file);
            if (fs.existsSync(oldPath)) {
                fs.renameSync(oldPath, newPath);
            } else {
                console.warn(`File not found: ${oldPath}`);
            }
        }
    }

    console.log('Documents organized successfully.');
}

organizeDocs();