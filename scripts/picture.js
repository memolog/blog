const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

hexo.extend.tag.register('picture', function(args){
  const options = {};
  args.forEach((arg) => {
    const [key, value, ...others] = arg.split(/=/);
    let otherStr = others.length ? '=' + others.join('=') : '';
    options[key] = value + otherStr;
  });

  let {src, width, height, color, alt} = options;

  const picture = render({width, height, color, alt, src});
  return `<div class="content__image">${picture}</div>`;
});

hexo.extend.helper.register('picture', function(src, options){
  let {width, height, color, alt} = options && options.data || {};
  return render({width, height, color, alt, src});
});

function render(data) {
  let {width, height, color, alt, src} = data;
  const {dir, name, ext} = path.parse(src);

  if ((!width || !height)) {
    const source = dir.replace(/^\//, '/source/');
    if (ext === '.svg') {
      const file = fs.readFileSync(path.resolve(__dirname, `../${source}/${name}${ext}`), {encoding: 'utf8'});
      const svgDom = new JSDOM(file).window.document.getElementsByTagName('svg')[0];
      width = parseInt(svgDom.getAttribute('width'), 10);
      height = parseInt(svgDom.getAttribute('height'), 10);
      color = color || svgDom.getAttribute('fill') || svgDom.children[0].getAttribute('fill');
    } else {
      const dimension = sizeOf(path.resolve(__dirname, `../${source}/${name}_medium${ext}`));
      width = Math.min(dimension.width, 900);
      height = parseInt(dimension.height * (width / dimension.width), 10);
    }
  }

  width = width || 700;
  height = height || 335;
  color = color || '#f5f2f0';
  alt = alt || '';

  const wRatio = height / width;
  const hRatio = width  / height;

  if (width > 700) {
    width = 700;
    height = Math.floor(width * wRatio);
    if (height < 335) {
      height = 335;
      width = Math.floor(height * hRatio);
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" fill="${color}" /></svg>`;

  const inlineSVG = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

  if (ext === '.svg') {
    return `<div style="background-color: ${color}"><img src="${dir}/${name}${ext}" alt="${alt}" role="presentation" loading="lazy" width="${width}" height="${height}" /></div>`;
  }

  return `<picture>
    <source srcset="${dir}/${name}_small${ext}, ${dir}/${name}_small@2x${ext} 2x, ${dir}/${name}_small@3x${ext} 3x" type="image/jpg" media="(max-width: 450px)" />
    <source srcset="${dir}/${name}_medium.webp, ${dir}/${name}_medium@2x.webp 2x" type="image/webp" />
    <source srcset="${dir}/${name}_medium${ext}, ${dir}/${name}_medium@2x${ext} 2x" type="image/jpg" />
    <img src="${dir}/${name}_medium${ext}" alt="${alt}" role="presentation" loading="lazy" />
  </picture>`;
}
