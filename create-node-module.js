parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.createNodeModule=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({iH4R:[function(require,module,exports){parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&void 0!==module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.formatPackageJSONFile=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({sVtx:[function(require,module,exports){parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&void 0!==module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.formatJSONFile=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({Uq2g:[function(require,module,exports){"use strict";const fs=require("fs"),util=require("util"),fsAsync=fs.promises,JSON_FILE_EXTENSION_PATTERN=/\.json$/;module.exports=async function(filePath,option){try{if("string"==typeof filePath&&filePath.length>5&&!0===(await fsAsync.stat(filePath)).isFile()&&!0===JSON_FILE_EXTENSION_PATTERN.test(filePath)){option=option||{};const JSONFileContent=await fsAsync.readFile(filePath),JSONData=JSON.parse(JSONFileContent),JSONFormattedData=!0===option.sortProperty?!0===Array.isArray(option.propertyList)&&option.propertyList.length>0?option.propertyList.reduce((function(data,property){return property in JSONData==1&&(data[property]=JSONData[property]),data}),{}):Object.keys(JSONData).sort().reduce((function(data,property){return property in JSONData==1&&(data[property]=JSONData[property]),data}),{}):JSONData;return await fsAsync.writeFile(filePath,JSON.stringify(JSONFormattedData,null,"\t")),!0}throw new Error(["#invalid-json-file-path;","cannot format json file;","invalid json file path;","@file-path:",filePath+";"])}catch(error){throw new Error(["#cannot-format-json-file;","cannot format json file;","cannot execute format json file;","@error-data:",util.inspect(error)+";"])}}},{}]},{},["Uq2g"])},{}],BERS:[function(require,module,exports){"use strict";const PACKAGE_PROPERTY_LIST=Object.freeze(["name","version","description","main","scripts","bin","repository","keywords","author","contributors","license","bugs","homepage","dependencies","devDependencies"]);module.exports=PACKAGE_PROPERTY_LIST},{}],A4DN:[function(require,module,exports){"use strict";
/*;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor
			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>
			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/const fs=require("fs"),path=require("path"),util=require("util"),formatJSONFile=require("format-json-file"),fsAsync=fs.promises,DEFAULT_PACKAGE_PROPERTY_LIST=require("./package-property-list.constant.js");module.exports=async function(moduleDirectoryPath,option){try{if("string"==typeof moduleDirectoryPath&&moduleDirectoryPath.length>1&&!0===(await fsAsync.stat(moduleDirectoryPath)).isDirectory()){option=option||{};const packageJSONFilePath=path.resolve(moduleDirectoryPath,"package.json"),PACKAGE_PROPERTY_LIST=!0===Array.isArray(option.propertyList)?option.propertyList:DEFAULT_PACKAGE_PROPERTY_LIST;if(!0===(await fsAsync.stat(packageJSONFilePath)).isFile())return await formatJSONFile(packageJSONFilePath,{sortProperty:!0,propertyList:PACKAGE_PROPERTY_LIST});throw new Error(["#cannot-find-package-json-file;","cannot format package json file;","cannot find package json file;","@package-json-file-path:",packageJSONFilePath+";"])}throw new Error(["#invalid-module-directory-path;","cannot format package json file;","invalid module directory path;","@module-directory-path:",moduleDirectoryPath+";"])}catch(error){throw new Error(["#cannot-format-package-json-file;","cannot format package json file;","cannot execute format package json file;","@error-data:",util.inspect(error)+";"])}}},{"format-json-file":"sVtx","./package-property-list.constant.js":"BERS"}]},{},["A4DN"])},{}],M5mu:[function(require,module,exports){"use strict";
/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor
			<
				@year-range:
					2020-present
				@end-year-range
			>
			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/const childProcess=require("child_process"),fs=require("fs"),path=require("path"),util=require("util"),formatPackageJSONFile=require("format-package-json-file"),fsAsync=fs.promises,MODULE_DIRECTORY_PATH_REPLACER_PATTERN=new RegExp("{{ @module-directory-path }}","gm"),MODULE_VALUE_NAMESPACE_REPLACER_PATTERN=new RegExp("{{ @module-value-namespace }}","gm"),MODULE_VALUE_TITLE_NAMESPACE_REPLACER_PATTERN=new RegExp("{{ @module-value-title-namespace }}","gm"),MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN=new RegExp("\\$moduleVariableNamespace","gm"),MODULE_DESCRIPTION_REPLACER_PATTERN=new RegExp("{{ @module-description }}","gm"),LICENSE_YEAR_REPLACER_PATTERN=new RegExp("{{ @license-year }}","gm"),AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN=new RegExp("{{ @author-title-namespace }}","gm"),AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN=new RegExp("{{ @author-contact-detail }}","gm"),MODULE_TEMPLATE_FILE_PATH=__dirname+"/module.template.js",TEST_TEMPLATE_FILE_PATH=__dirname+"/test.template.js",MIT_LICENSE_TEMPLATE_FILE_PATH=__dirname+"/mit-license.template.txt",PACKAGE_TEMPLATE_FILE_PATH=__dirname+"/package.template.json",GITIGNORE_TEMPLATE_FILE_PATH=__dirname+"/gitignore.template.txt",EDITORCONFIG_TEMPLATE_FILE_PATH=__dirname+"/editorconfig.template.txt",getShellCommandResult=async function(shellCommand,moduleDirectoryPath){const resultList=[];var _iteratorError,_iteratorNormalCompletion=!0,_didIteratorError=!1;try{for(var _step,_value,_iterator=function(iterable){var method;if("undefined"!=typeof Symbol){if(Symbol.asyncIterator&&null!=(method=iterable[Symbol.asyncIterator]))return method.call(iterable);if(Symbol.iterator&&null!=(method=iterable[Symbol.iterator]))return method.call(iterable)}throw new TypeError("Object is not async iterable")}(childProcess.exec(shellCommand,{cwd:moduleDirectoryPath}).stdout);_iteratorNormalCompletion=(_step=await _iterator.next()).done,_value=await _step.value,!_iteratorNormalCompletion;_iteratorNormalCompletion=!0){const result=_value;resultList.push(result.trim())}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{_iteratorNormalCompletion||null==_iterator.return||await _iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}return resultList.join("").trim()},writeFile=async function(filePath,fileContent){return await fsAsync.writeFile(filePath,fileContent,"utf8")};module.exports=async function(moduleDirectoryPath,option){try{if("string"==typeof moduleDirectoryPath&&moduleDirectoryPath.length>1&&!0===(await fsAsync.stat(moduleDirectoryPath)).isDirectory()){const moduleValueNamespace="string"==typeof(option=option||{}).moduleValueNamespace&&option.moduleValueNamespace.length>0?option.moduleValueNamespace:await getShellCommandResult("basename $(git remote get-url origin) .git",moduleDirectoryPath),moduleValueTitleNamespace=moduleValueNamespace.replace(/\-/g," "),moduleVariableNamespace=moduleValueNamespace.replace(/\-([a-z0-9])/g,match=>match.slice(1).toUpperCase()),moduleScope="string"==typeof option.moduleScope&&option.moduleScope.length>0?option.moduleScope:void 0,moduleDescription="string"==typeof option.moduleDescription&&option.moduleDescription.length>0?option.moduleDescription:await getShellCommandResult("sed '2q;d' {{ @module-directory-path }}/README.md".replace(MODULE_DIRECTORY_PATH_REPLACER_PATTERN,path.resolve(moduleDirectoryPath)),moduleDirectoryPath),authorTitleNamespace="string"==typeof option.authorTitleNamespace&&option.authorTitleNamespace.length>0?option.authorTitleNamespace:await getShellCommandResult("git log -1 --pretty=format:'%an'",moduleDirectoryPath),authorContactDetail="string"==typeof option.authorContactDetail&&option.authorContactDetail.length>0?option.authorContactDetail:await getShellCommandResult("git log -1 --pretty=format:'%ae'",moduleDirectoryPath),licenseYear=(new Date).getFullYear(),repositoryRemoteURLPath=(await getShellCommandResult("git config --get remote.origin.url",moduleDirectoryPath)).replace(".git",""),MODULE_TEMPLATE=(await fsAsync.readFile(MODULE_TEMPLATE_FILE_PATH,"utf8")).replace(MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN,moduleVariableNamespace).replace(MODULE_VALUE_NAMESPACE_REPLACER_PATTERN,moduleValueNamespace).replace(MODULE_VALUE_TITLE_NAMESPACE_REPLACER_PATTERN,moduleValueTitleNamespace).replace(MODULE_DESCRIPTION_REPLACER_PATTERN,moduleDescription).replace(LICENSE_YEAR_REPLACER_PATTERN,licenseYear).replace(AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN,authorTitleNamespace).replace(AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN,authorContactDetail),TEST_TEMPLATE=(await fsAsync.readFile(TEST_TEMPLATE_FILE_PATH,"utf8")).replace(MODULE_VALUE_NAMESPACE_REPLACER_PATTERN,moduleValueNamespace).replace(MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN,moduleVariableNamespace),MIT_LICENSE_TEMPLATE=(await fsAsync.readFile(MIT_LICENSE_TEMPLATE_FILE_PATH,"utf8")).replace(LICENSE_YEAR_REPLACER_PATTERN,licenseYear).replace(AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN,authorTitleNamespace).replace(AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN,authorContactDetail),PACKAGE_TEMPLATE=Object.assign({},JSON.parse(await fsAsync.readFile(PACKAGE_TEMPLATE_FILE_PATH,"utf8")),{name:"string"==typeof moduleScope&&moduleScope.length>0?`@${moduleScope}/${moduleValueNamespace}`:moduleValueNamespace,description:moduleDescription,main:moduleValueNamespace+".js",scripts:{test:`node ./${moduleValueNamespace}.test.js`},keywords:[moduleValueNamespace].concat(moduleValueNamespace.split("-")),author:`${authorTitleNamespace} <${authorContactDetail}>`,contributors:[`${authorTitleNamespace} <${authorContactDetail}>`],repository:{type:"git",url:repositoryRemoteURLPath+".git"},bugs:{url:repositoryRemoteURLPath+"/issues"},homepage:repositoryRemoteURLPath+"#readme"}),GITIGNORE_TEMPLATE=await fsAsync.readFile(GITIGNORE_TEMPLATE_FILE_PATH,"utf8"),EDITORCONFIG_TEMPLATE=await fsAsync.readFile(EDITORCONFIG_TEMPLATE_FILE_PATH,"utf8");return await writeFile(path.resolve(moduleDirectoryPath,moduleValueNamespace+".module.js"),MODULE_TEMPLATE),await writeFile(path.resolve(moduleDirectoryPath,moduleValueNamespace+".test.js"),TEST_TEMPLATE),await writeFile(path.resolve(moduleDirectoryPath,"LICENSE"),MIT_LICENSE_TEMPLATE),await writeFile(path.resolve(moduleDirectoryPath,"package.json"),JSON.stringify(PACKAGE_TEMPLATE)),await formatPackageJSONFile(moduleDirectoryPath),await writeFile(path.resolve(moduleDirectoryPath,".gitignore"),GITIGNORE_TEMPLATE),await writeFile(path.resolve(moduleDirectoryPath,".editorconfig"),EDITORCONFIG_TEMPLATE),!0}throw new Error(["#invalid-module-directory-path;","cannot create node module;","invalid module directory path;","@module-directory-path:",moduleDirectoryPath+";"])}catch(error){throw new Error(["#cannot-create-node-module;","cannot create node module;","cannot execute create node module;","@error-data:",util.inspect(error)+";"])}}},{"format-package-json-file":"iH4R"}]},{},["M5mu"]);