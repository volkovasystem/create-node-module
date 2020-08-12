"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	util
										.promisify(
											(
												childProcess
												.exec
											)
										)(
											(
												shellCommand
											),

											(
												{
													"cwd": (
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

const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const $moduleVariableNamespace = (
	require( "./{{ @module-value-namespace }}.js" )
);

const TEST_SAMPLE_UNIT = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
				);

				try{
					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							true
						),

						(
							testValue
						),

						(
							[
								"#test-sample-unit;",

								"test sample unit;",

								`must assert to ${ testValue };`
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
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test sample unit"
								),

								"result": (
									await	TEST_SAMPLE_UNIT( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
