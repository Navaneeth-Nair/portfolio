const fs = require('fs');
const files = ['Hero.jsx', 'About.jsx', 'Projects.jsx', 'Skills.jsx', 'Contact.jsx'].map(f => 'src/sections/' + f);
files.push('src/components/canvas/CursorTrail.jsx');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace standard rbga whites
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.0[1-3]\)/g, "var(--theme-surface-glass)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.0[4-7]\)/g, "var(--theme-border-faint)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.[0-1][0-9]\)/g, "var(--theme-border-light)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.2[0-9]?\)/g, "var(--theme-border-strong)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.[3-4][0-9]?\)/g, "var(--theme-text-tertiary)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.[5-6][0-9]?\)/g, "var(--theme-text-secondary)");
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.[7-9][0-9]?\)/g, "var(--theme-text-primary)");
  
  // Replace absolute colors
  content = content.replace(/color:\s*'white'/g, "color: 'var(--theme-text-primary)'");
  content = content.replace(/background:\s*'white'/g, "background: 'var(--theme-text-primary)'");
  content = content.replace(/borderTop:\s*'1px solid white'/g, "borderTop: '1px solid var(--theme-text-primary)'");
  content = content.replace(/stroke="white"/g, 'stroke="var(--theme-text-primary)"');
  content = content.replace(/fill="white"/g, 'fill="var(--theme-text-primary)"');
  content = content.replace(/color:\s*'#050505'/g, "color: 'var(--theme-bg)'");
  content = content.replace(/background:\s*'#050505'/g, "background: 'var(--theme-bg)'");

  // Fix Hero layout
  content = content.replace(/fontSize: 'clamp\(4rem, 12vw, 8rem\)',\s*fontWeight: 700,\s*lineHeight: 1,\s*letterSpacing: '-0.04em',\s*margin: '0 0 1.5rem -0.04em',\s*\/\/\s*Using theme colors so it adapts dynamically\s*color: 'var\(--theme-text-primary\)',/gm, "fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', fontWeight: 300, letterSpacing: '0.02em', color: 'var(--theme-text-primary)',");

  // In Contact.jsx, wait.
  // In Projects.jsx, there are box shadows: rgba(0,0,0,0.6) -> don't replace shadows heavily right now, let it be.
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
