const fs = require('node:fs');
const path = require('node:path');

const projectDirectory = path.join(__dirname, '..', 'projects');
const outputDirectory = path.join(__dirname, '..', 'dist');
const projectFiles = fs.readdirSync(projectDirectory).filter((file) => file.endsWith('.html'));
const orderValues = new Set();

const projects = projectFiles.map((file) => {
    const html = fs.readFileSync(path.join(projectDirectory, file), 'utf8');
    const metadata = new Map();

    for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
        const name = match[0].match(/\bname\s*=\s*(["'])(.*?)\1/i)?.[2];
        const content = match[0].match(/\bcontent\s*=\s*(["'])(.*?)\1/i)?.[2];
        if (name && content) {
            metadata.set(name.toLowerCase(), content.trim());
        }
    }

    const order = Number(metadata.get('project-order'));
    const title = metadata.get('project-title');
    const category = metadata.get('project-category');
    const summary = metadata.get('project-summary');

    if (!Number.isInteger(order) || order < 1 || !title || !category || !summary) {
        throw new Error(`Missing or invalid project metadata in ${file}.`);
    }
    if (orderValues.has(order)) {
        throw new Error(`Project order ${order} is used more than once.`);
    }
    orderValues.add(order);

    return {
        order,
        href: `projects/${file}`,
        title,
        category,
        summary,
    };
});

projects.sort((first, second) => first.order - second.order);
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, 'projects.json'), `${JSON.stringify(projects, null, 2)}\n`);
