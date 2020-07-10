"use strict";

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
*/

const childProcess = require( "child_process" );
const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

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

const GET_MODULE_VARIABLE_NAMESPACE_SHELL_COMMAND = (
	"basename $(git remote get-url origin) .git"
);

const GET_MODULE_DESCRIPTION_SHELL_COMMAND = (
	"sed '2q;d' {{ @module-directory-path }}/README.md"
);

const GET_AUTHOR_TITLE_NAMESPACE_SHELL_COMMAND = (
	"git log -1 --pretty=format:'%an'"
);

const GET_AUTHOR_CONTACT_DETAIL_SHELL_COMMAND = (
	"git log -1 --pretty=format:'%ae'"
);

const GET_REPOSITORY_REMOTE_URL_PATH_SHELL_COMMAND = (
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

const GITIGNORE_TEMPLATE_FILE_PATH = (
	`${ __dirname }/gitignore.template.txt`
);

const EDITORCONFIG_TEMPLATE_FILE_PATH = (
	`${ __dirname }/editorconfig.template.txt`
);

const getShellCommandResult = (
	async	function getShellCommandResult( shellCommand, moduleDirectoryPath ){
				const resultList = (
					[ ]
				);

				for await (
					const result of (
						childProcess
						.exec(
							(
								shellCommand
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

const createNodeModule = (
	async	function createNodeModule( moduleDirectoryPath, option ){
				/*;
					@procedure-definition:
						Fast bootstrap node module.
					@end-procedure-definition

					@parameter-definition:
						{
							"moduleDirectoryPath": "
								[
									@type:
											string
									@end-type

									<@required;>
								]
							",

							"option": "
								[
									@type:
											object with {
												"moduleValueNamespace": "[@type:string;]",
												"moduleScope": "[@type:string;]",
												"moduleDescription": "[@type:string;]",
												"authorTitleNamespace": "[@type:string;]",
												"authorContactDetail": "[@type:string]"
											}
									@end-type
								]
							"
						}
					@end-parameter-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type
								]
							"
						}
					@end-trigger-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											boolean
									@end-type
								]
							"
						}
					@end-result-definition
				*/

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

						&&	(
									(
										await	fsAsync
												.stat(
													(
														moduleDirectoryPath
													)
												)
									)
									.isDirectory( )
								===	true
							)
					){
						option = (
								(
									option
								)

							||	(
									{ }
								)
						);

						const moduleValueNamespace = (
								(
										(
												typeof
												option
												.moduleValueNamespace
											==	"string"
										)

									&&	(
												(
													option
													.moduleValueNamespace
												)
												.length
											>	0
										)
								)
							?	(
									option
									.moduleValueNamespace
								)
							:	(
									await	getShellCommandResult(
												(
													GET_MODULE_VARIABLE_NAMESPACE_SHELL_COMMAND
												),

												(
													moduleDirectoryPath
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
												option
												.moduleScope
											==	"string"
										)

									&&	(
												(
													option
													.moduleScope
												)
												.length
											>	0
										)
								)
							?	(
									option
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
												option
												.moduleDescription
											==	"string"
										)

									&&	(
												(
													option
													.moduleDescription
												)
												.length
											>	0
										)
								)
							?	(
									option
									.moduleDescription
								)
							:	(
									await	getShellCommandResult(
												(
													GET_MODULE_DESCRIPTION_SHELL_COMMAND
													.replace(
														(
															MODULE_DIRECTORY_PATH_REPLACER_PATTERN
														),

														(
															path
															.resolve(
																(
																	moduleDirectoryPath
																)
															)
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
												option
												.authorTitleNamespace
											==	"string"
										)

									&&	(
												(
													option
													.authorTitleNamespace
												)
												.length
											>	0
										)
								)
							?	(
									option
									.authorTitleNamespace
								)
							:	(
									await	getShellCommandResult(
												(
													GET_AUTHOR_TITLE_NAMESPACE_SHELL_COMMAND
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
												option
												.authorContactDetail
											==	"string"
										)

									&&	(
												(
													option
													.authorContactDetail
												)
												.length
											>	0
										)
								)
							?	(
									option
									.authorContactDetail
								)
							:	(
									await	getShellCommandResult(
												(
													GET_AUTHOR_CONTACT_DETAIL_SHELL_COMMAND
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
								await	getShellCommandResult(
											(
												GET_REPOSITORY_REMOTE_URL_PATH_SHELL_COMMAND
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
											.resolve(
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
											.resolve(
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
											.resolve(
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
											.resolve(
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
											.resolve(
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
											.resolve(
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
