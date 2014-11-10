var fs = require('fs'),
	path = require('path'),
	rootDir = path.normalize(`${__dirname}/../../`);

var Helpers = {
	loadFryModules: function(fry) {
		var pack = require(`${rootDir}/package.json`),
			deps = pack.dependencies;
		for(var i in deps) {
			if(i.match(/^zaz-fry-/)) {
				try {
					require(i)(fry);
				} catch (moduleError) {
					moduleError.message = `Exception requiring ${i} : ${moduleError.message}`;
					console.log(moduleError.message);
				}
			}
		}
	}
};

export default Helpers;