var fs = require('fs');
var tmplPath = __dirname + '/tmpl.js';
var tmpl = fs.readFileSync(tmplPath, 'utf8');


module.exports = function(source) {
	this.cacheable && this.cacheable();

    var htmlStr, template;

    template = tmpl.split('/*push data*/');
    htmlStr = source || '';
    content = htmlStr.split(/\n|\r/);
    content.forEach(function (s) {
        var len;
        if (s.trim() === '') {
            return;
        }

        s = s.replace(/\'/g, '\\\'').replace(/\"/g, '\\\"');
        len = template.length;
        template[len] = template[len - 1];
        template[len - 1] = '\n    templateArray.push(\'' + s + '\');';
    });

    htmlStr = template.join('');

	return htmlStr;
};
