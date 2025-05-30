const fs = require('fs');
const path = require('path');

// Rutas
const skillsPath = path.join(__dirname, '../../src/assets/skills.json');
const readmePath = path.join(__dirname, '../../README.md');

// Lee skills.json
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

// Genera el markdown de skills
const skillsMarkdown = skills.map(skill => `![${skill.name}](https://raw.githubusercontent.com/${process.env.GITHUB_REPOSITORY}/main/${skill.logo.replace('assets/', 'src/assets/')})`).join(' ');

// Lee README.md
let readme = fs.readFileSync(readmePath, 'utf8');

// Reemplaza la sección de skills
const startTag = '<!-- SKILLS-START -->';
const endTag = '<!-- SKILLS-END -->';
const regex = new RegExp(`${startTag}[\s\S]*${endTag}`, 'm');
const newSection = `${startTag}\n${skillsMarkdown}\n${endTag}`;

if (regex.test(readme)) {
  readme = readme.replace(regex, newSection);
} else {
  // Si no existe la sección, la agrega al final
  readme += `\n\n${newSection}`;
}

fs.writeFileSync(readmePath, readme);
console.log('README.md actualizado con skills.');
