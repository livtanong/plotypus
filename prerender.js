var global = this;
var prerendered = require('./build/prerenderHtml');
var fs = require('fs');

// var replace = function(html) {
//     return (html
//             .replace('bundle.css', 'bundle.'+hash+'.css')
//             .replace('bundle.js', 'bundle.'+hash+'.js')
//             .replace('embed.js', 'embed.'+hash+'.js')
//     );
// }
fs.writeFileSync('./index.html', prerendered);
// fs.writeFileSync('./build/embed.html', replace(prerendered.embed));
