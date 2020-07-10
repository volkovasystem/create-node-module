"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = assert.strict;

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
							true
						),

						(
							[
								"#test-create-node-module;",

								"test create node module;",
								"must return true;"
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
					[
						{
							"test": (
								"test create node module"
							),

							"result": (
								await	TEST_CREATE_NODE_MODULE( )
							)
						}
					]
				);

				(
					await	TEST_CLEANUP_DIRECTORY( )
				);
			}
)( );
