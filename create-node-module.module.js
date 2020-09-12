"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

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
	@license:module;
*/

const createNodeModule = (
	async	function createNodeModule( moduleDirectoryPath, optionData ){
				/*;
					@definition:
						@procedure:#createNodeModule
							@description:
								Fast bootstrap Node module.
							@description;
						@procedure;

						@parameter:#moduleDirectoryPath
							@type:
									string
							@type;

							@description:
							@description;

							@required;
						@parameter;

						@parameter:#optionData
							@type:
									object:with:[
										moduleValueNamespace,
										moduleScope,
										moduleDescription,
										authorTitleNamespace,
										authorContactDetail
									]
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.moduleValueNamespace
							@type:
									string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.moduleScope
							@type:
									string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.moduleDescription
							@type:
									string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.authorTitleNamespace
							@type:
									string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.authorContactDetail
							@type:
									string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@result:#result
							@type:
									boolean
							@type;

							@description:
							@description;
						@result;

						@trigger:#trigger
							@type:
									object:as:Error
							@type;

							@description:
							@description;

							@tag:#invalid-module-directory-path;
							@tag:#undefined-module-directory;
							@tag:#cannot-create-node-module;
						@trigger;
					@definition;
				*/

				const childProcess = require( "child_process" );
				const fs = require( "fs" );
				const path = require( "path" );
				const util = require( "util" );

				const formatJSONFile = (
					require( "format-json-file" )
				);

				const formatPackageJSONFile = (
					require( "format-package-json-file" )
				);

				const fsAsync = (
					fs
					.promises
				);

				const MODULE_DIRECTORY_PATH_REPLACER_PATTERN = (
					new	RegExp(
							(
								"{{ @module-directory-path }}"
							),

							(
								"gm"
							)
						)
				);

				const MODULE_VALUE_NAMESPACE_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @module-value-namespace }}"
						),

						(
							"gm"
						)
					)
				);

				const MODULE_VALUE_TITLE_NAMESPACE_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @module-value-title-namespace }}"
						),

						(
							"gm"
						)
					)
				);

				const MODULE_TITLE_NAMESPACE_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @module-title-namespace }}"
						),

						(
							"gm"
						)
					)
				);

				const MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN = (
					new	RegExp(
						(
							"\\$moduleVariableNamespace"
						),

						(
							"gm"
						)
					)
				);

				const MODULE_DESCRIPTION_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @module-description }}"
						),

						(
							"gm"
						)
					)
				);

				const LICENSE_YEAR_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @license-year }}"
						),

						(
							"gm"
						)
					)
				);

				const AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @author-title-namespace }}"
						),

						(
							"gm"
						)
					)
				);

				const AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN = (
					new	RegExp(
						(
							"{{ @author-contact-detail }}"
						),

						(
							"gm"
						)
					)
				);

				const GET_MODULE_VALUE_NAMESPACE_SHELL_SCRIPT = (
					"basename $(git remote get-url origin) .git"
				);

				const GET_MODULE_DESCRIPTION_SHELL_SCRIPT = (
					"sed '2q;d' {{ @module-directory-path }}/README.md"
				);

				const GET_AUTHOR_TITLE_NAMESPACE_SHELL_SCRIPT = (
					"git log -1 --pretty=format:'%an'"
				);

				const GET_AUTHOR_CONTACT_DETAIL_SHELL_SCRIPT = (
					"git log -1 --pretty=format:'%ae'"
				);

				const GET_REPOSITORY_REMOTE_URL_PATH_SHELL_SCRIPT = (
					"git config --get remote.origin.url"
				);

				const MODULE_TEMPLATE_FILE_PATH = (
					`${ __dirname }/module.template.js`
				);

				const TEST_TEMPLATE_FILE_PATH = (
					`${ __dirname }/test.template.js`
				);

				const MIT_LICENSE_TEMPLATE_FILE_PATH = (
					`${ __dirname }/mit-license.template.txt`
				);

				const PACKAGE_TEMPLATE_FILE_PATH = (
					`${ __dirname }/package.template.json`
				);

				const DEFINITION_TEMPLATE_FILE_PATH = (
					`${ __dirname }/definition.template.json`
				);

				const GITIGNORE_TEMPLATE_FILE_PATH = (
					`${ __dirname }/gitignore.template.txt`
				);

				const NPMIGNORE_TEMPLATE_FILE_PATH = (
					`${ __dirname }/npmignore.template.txt`
				);

				const EDITORCONFIG_TEMPLATE_FILE_PATH = (
					`${ __dirname }/editorconfig.template.txt`
				);

				const getShellScriptResult = (
					async	function getShellScriptResult( shellScript, moduleDirectoryPath ){
								const resultList = (
									[ ]
								);

								for await (
									const result of (
										childProcess
										.exec(
											(
												shellScript
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
										.stdout
									)
								){
									resultList
									.push(
										(
											result
											.trim( )
										)
									);
								}

								return	(
											resultList
											.join(
												(
													""
												)
											)
											.trim( )
										);
							}
				);

				const writeFile = (
					async	function writeFile( filePath, fileContent ){
								return	(
											await	fsAsync
													.writeFile(
														(
															filePath
														),

														(
															fileContent
														),

														(
															"utf8"
														)
													)
										);
							}
				);

				try{
					if(
							(
									typeof
									moduleDirectoryPath
								==	"string"
							)

						&&	(
									moduleDirectoryPath
									.length
								>	1
							)
					){
						(
								moduleDirectoryPath
							=	(
									path
									.resolve(
										(
											moduleDirectoryPath
										)
									)
								)
						);
					}
					else{
						throw	(
									new	Error(
											(
												[
													"#invalid-module-directory-path;",

													"cannot create node module;",
													"invalid module directory path;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}

					if(
							(
									(
										await	fsAsync
												.stat(
													(
														moduleDirectoryPath
													)
												)
									)
									.isDirectory( )
								!==	true
							)
					){
						throw	(
									new	Error(
											(
												[
													"#undefined-module-directory;",

													"cannot create node module;",
													"undefined module directory;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}

					(
							optionData
						=	(
									(
										optionData
									)

								||	(
										{ }
									)
							)
					);

					const moduleValueNamespace = (
							(
									(
											typeof
											optionData
											.moduleValueNamespace
										==	"string"
									)

								&&	(
											(
												optionData
												.moduleValueNamespace
											)
											.length
										>	0
									)
							)
						?	(
								optionData
								.moduleValueNamespace
							)
						:	(
								await	getShellScriptResult(
											(
												GET_MODULE_VALUE_NAMESPACE_SHELL_SCRIPT
											),

											(
												moduleDirectoryPath
											)
										)
							)
					);

					const moduleValueTitleNamespace = (
						moduleValueNamespace
						.replace(
							(
								/\-/g
							),

							(
								" "
							)
						)
					);

					const moduleTitleNamespace = (
						moduleValueTitleNamespace
						.replace(
							(
								/^([a-z])|(\s[a-z])/g
							),

							(
								( match ) => (
									match
									.toUpperCase( )
								)
							)
						)
					);

					const moduleVariableNamespace = (
						moduleValueNamespace
						.replace(
							(
								/\-([a-z0-9])/g
							),

							(
								( match ) => (
									match
									.slice(
										(
											1
										)
									)
									.toUpperCase( )
								)
							)
						)
					);

					const moduleScope = (
							(
									(
											typeof
											optionData
											.moduleScope
										==	"string"
									)

								&&	(
											(
												optionData
												.moduleScope
											)
											.length
										>	0
									)
							)
						?	(
								optionData
								.moduleScope
							)
						:	(
								undefined
							)
					);

					const moduleDescription = (
							(
									(
											typeof
											optionData
											.moduleDescription
										==	"string"
									)

								&&	(
											(
												optionData
												.moduleDescription
											)
											.length
										>	0
									)
							)
						?	(
								optionData
								.moduleDescription
							)
						:	(
								await	getShellScriptResult(
											(
												GET_MODULE_DESCRIPTION_SHELL_SCRIPT
												.replace(
													(
														MODULE_DIRECTORY_PATH_REPLACER_PATTERN
													),

													(
														moduleDirectoryPath
													)
												)
											),

											(
												moduleDirectoryPath
											)
										)
							)
					);

					const authorTitleNamespace = (
							(
									(
											typeof
											optionData
											.authorTitleNamespace
										==	"string"
									)

								&&	(
											(
												optionData
												.authorTitleNamespace
											)
											.length
										>	0
									)
							)
						?	(
								optionData
								.authorTitleNamespace
							)
						:	(
								await	getShellScriptResult(
											(
												GET_AUTHOR_TITLE_NAMESPACE_SHELL_SCRIPT
											),

											(
												moduleDirectoryPath
											)
										)
							)
					);

					const authorContactDetail = (
							(
									(
											typeof
											optionData
											.authorContactDetail
										==	"string"
									)

								&&	(
											(
												optionData
												.authorContactDetail
											)
											.length
										>	0
									)
							)
						?	(
								optionData
								.authorContactDetail
							)
						:	(
								await	getShellScriptResult(
											(
												GET_AUTHOR_CONTACT_DETAIL_SHELL_SCRIPT
											),

											(
												moduleDirectoryPath
											)
										)
							)
					);

					const licenseYear = (
						(
							new	Date( )
						)
						.getFullYear( )
					);

					const repositoryRemoteURLPath = (
						(
							await	getShellScriptResult(
										(
											GET_REPOSITORY_REMOTE_URL_PATH_SHELL_SCRIPT
										),

										(
											moduleDirectoryPath
										)
									)
						)
						.replace(
							(
								".git"
							),

							(
								""
							)
						)
					);

					const MODULE_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											MODULE_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
						.replace(
							(
								MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleVariableNamespace
							)
						)
						.replace(
							(
								MODULE_VALUE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleValueNamespace
							)
						)
						.replace(
							(
								MODULE_VALUE_TITLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleValueTitleNamespace
							)
						)
						.replace(
							(
								MODULE_DESCRIPTION_REPLACER_PATTERN
							),

							(
								moduleDescription
							)
						)
						.replace(
							(
								LICENSE_YEAR_REPLACER_PATTERN
							),

							(
								licenseYear
							)
						)
						.replace(
							(
								AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								authorTitleNamespace
							)
						)
						.replace(
							(
								AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN
							),

							(
								authorContactDetail
							)
						)
					);

					const TEST_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											TEST_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
						.replace(
							(
								MODULE_VALUE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleValueNamespace
							)
						)
						.replace(
							(
								MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleVariableNamespace
							)
						)
					);

					const MIT_LICENSE_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											MIT_LICENSE_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
						.replace(
							(
								LICENSE_YEAR_REPLACER_PATTERN
							),

							(
								licenseYear
							)
						)
						.replace(
							(
								AUTHOR_TITLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								authorTitleNamespace
							)
						)
						.replace(
							(
								AUTHOR_CONTACT_DETAIL_REPLACER_PATTERN
							),

							(
								authorContactDetail
							)
						)
					);

					const PACKAGE_TEMPLATE = (
						Object
						.assign(
							(
								{ }
							),

							(
								JSON
								.parse(
									(
										await	fsAsync
												.readFile(
													(
														PACKAGE_TEMPLATE_FILE_PATH
													),

													(
														"utf8"
													)
												)
									)
								)
							),

							(
								{
									"name": (
											(
													(
															typeof
															moduleScope
														==	"string"
													)

												&&	(
															moduleScope
															.length
														>	0
													)
											)
										?	(
												`@${ moduleScope }/${ moduleValueNamespace }`
											)
										:	(
												moduleValueNamespace
											)
									),

									"alias": (
										moduleValueNamespace
									),

									"description": (
										moduleDescription
									),

									"main": (
										`${ moduleValueNamespace }.js`
									),

									"scripts": (
										{
											"test": (
												`node ./${ moduleValueNamespace }.test.js`
											)
										}
									),

									"keywords": (
										[
											moduleValueNamespace
										]
										.concat(
											(
												moduleValueNamespace
												.split(
													(
														"-"
													)
												)
											)
										)
									),

									"author": (
										`${ authorTitleNamespace } <${ authorContactDetail }>`
									),

									"contributors": (
										[
											(
												`${ authorTitleNamespace } <${ authorContactDetail }>`
											)
										]
									),

									"repository": (
										{
											"type": (
												"git"
											),

											"url": (
												`${ repositoryRemoteURLPath }.git`
											)
										}
									),

									"bugs": (
										{
											"url": (
												`${ repositoryRemoteURLPath }/issues`
											)
										}
									),

									"homepage": (
										`${ repositoryRemoteURLPath }#readme`
									),
								}
							)
						)
					);

					const DEFINITION_TEMPLATE = (
						Object
						.assign(
							(
								{ }
							),

							(
								JSON
								.parse(
									(
										(
											await	fsAsync
													.readFile(
														(
															DEFINITION_TEMPLATE_FILE_PATH
														),

														(
															"utf8"
														)
													)
										)
										.replace(
											(
												MODULE_TITLE_NAMESPACE_REPLACER_PATTERN
											),

											(
												moduleTitleNamespace
											)
										)
										.replace(
											(
												MODULE_DESCRIPTION_REPLACER_PATTERN
											),

											(
												moduleDescription
											)
										)
										.replace(
											(
												MODULE_VALUE_NAMESPACE_REPLACER_PATTERN
											),

											(
												moduleValueNamespace
											)
										)
										.replace(
											(
												MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN
											),

											(
												moduleVariableNamespace
											)
										)
									)
								)
							)
						)
					);

					const GITIGNORE_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											GITIGNORE_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
					);

					const NPMIGNORE_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											NPMIGNORE_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
					);

					const EDITORCONFIG_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											EDITORCONFIG_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												`${ moduleValueNamespace }.module.js`
											)
										)
									),

									(
										MODULE_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												`${ moduleValueNamespace }.test.js`
											)
										)
									),

									(
										TEST_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												"LICENSE"
											)
										)
									),

									(
										MIT_LICENSE_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												"package.json"
											)
										)
									),

									(
										JSON
										.stringify(
											(
												PACKAGE_TEMPLATE
											)
										)
									)
								)
					);

					(
						await	formatPackageJSONFile(
									(
										moduleDirectoryPath
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												"definition.json"
											)
										)
									),

									(
										JSON
										.stringify(
											(
												DEFINITION_TEMPLATE
											)
										)
									)
								)
					);

					(
						await	formatJSONFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												"definition.json"
											)
										)
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												".gitignore"
											)
										)
									),

									(
										GITIGNORE_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												".npmignore"
											)
										)
									),

									(
										NPMIGNORE_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.join(
											(
												moduleDirectoryPath
											),

											(
												".editorconfig"
											)
										)
									),

									(
										EDITORCONFIG_TEMPLATE
									)
								)
					);

					return	(
								true
							);
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-create-node-module;",

												"cannot create node module;",
												"cannot execute create node module;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = createNodeModule;
