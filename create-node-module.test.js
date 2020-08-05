"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const createNodeModule = (
	require( "./create-node-module.js" )
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );

				const executeAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	executeAsync(
											(
												shellCommand
											),

											(
												{
													"moduleDirectoryPath": (
															(
																moduleDirectoryPath
															)

														||	(
																process
																.cwd( )
															)
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);

const TEST_SETUP_DIRECTORY = (
	async	function TEST_SETUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const TEST_CLEANUP_DIRECTORY = (
	async	function TEST_CLEANUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const TEST_CREATE_NODE_MODULE = (
	async	function TEST_CREATE_NODE_MODULE( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				(
					await	executeShellCommand(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-module.git",
										".test/test-create-node-module"
									]
									.join(
										" "
									)
								)
							)
				);

				try{
					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							await	createNodeModule(
										(
											".test/test-create-node-module"
										)
									)
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-module;",

								"test create node module;",
								`must return ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

const TEST_CREATE_NODE_MODULE_FILE_LIST = (
	async	function TEST_CREATE_NODE_MODULE_FILE_LIST( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				(
					await	executeShellCommand(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-module.git",
										".test/test-create-node-module"
									]
									.join(
										" "
									)
								)
							)
				);

				try{
					const fs = require( "fs" );

					const fsAsync = (
						fs
						.promises
					);

					const testDirectory = (
						".test/test-create-node-module"
					);

					(
						await	createNodeModule(
									(
										testDirectory
									)
								)
					);

					const testModuleFileList = (
						[
							".editorconfig",
							".gitignore",
							".npmignore",
							"LICENSE",
							"package.json",
							"README.md",
							"test-create-node-module.module.js",
							"test-create-node-module.test.js"
						]
					);

					const actualModuleFileList = (
						(
							await	fsAsync
									.readdir(
										(
											testDirectory
										),

										(
											{
												"withFileTypes": true
											}
										)
									)
						)
						.filter(
							(
								( fileData ) => (
									fileData
									.isFile( )
								)
							)
						)
						.map(
							(
								( fileData ) => (
									fileData
									.name
								)
							)
						)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
								(
										(
											testModuleFileList
											.length
										)
									===	(
											actualModuleFileList
											.length
										)
								)

							&&	(
									testModuleFileList
									.every(
										(
											( fileName ) => (
												actualModuleFileList
												.includes(
													(
														fileName
													)
												)
											)
										)
									)
								)
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-module-file-list;",

								"test create node module file list;",
								`must contain the following, ${ testModuleFileList };`,
								`must return ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test create node module"
								),

								"result": (
									await	TEST_CREATE_NODE_MODULE( )
								)
							},

							{
								"test": (
									"test create node module file list"
								),

								"result": (
									await	TEST_CREATE_NODE_MODULE_FILE_LIST( )
								)
							}
						]
					)
				);

				(
					await	TEST_CLEANUP_DIRECTORY( )
				);
			}
)( );
