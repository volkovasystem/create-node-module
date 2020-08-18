"use strict";

//; @template-engine-code-space;
const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

//; @check-directory-procedure;
const checkDirectory = (
	async	function checkDirectory( directoryPath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						directoryPath
					=	(
							path
							.resolve(
								(
									directoryPath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														directoryPath
													)
												)
									)
									.isDirectory( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @end-check-directory-procedure;

//; @check-file-procedure;
const checkFile = (
	async	function checkFile( filePath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						filePath
					=	(
							path
							.resolve(
								(
									filePath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														filePath
													)
												)
									)
									.isFile( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @end-check-file-procedure;

//;	@get-directory-file-list-procedure;
const getDirectoryFileList = (
	async	function getDirectoryFileList( directoryPath ){
				const fs = require( "fs" );
				const path = require( "path" );

				const fsAsync = (
					fs
					.promises
				);

					directoryPath
				=	(
						path
						.resolve(
							(
								directoryPath
							)
						)
					);

				try{
					return	(
								await	fsAsync
										.readdir(
											(
												directoryPath
											),

											(
												{
													"withFileTypes": (
														true
													)
												}
											)
										)
							);
				}
				catch( error ){
					return	(
								[ ]
							);
				}
			}
);
//; @end-get-directory-file-list-procedure;

const executeShellScript = (
	async	function executeShellScript( shellScript, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					moduleDirectoryPath = (
						path
						.resolve(
							(
								moduleDirectoryPath
							)
						)
					);
				}
				else{
					moduleDirectoryPath = (
						process
						.cwd( )
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
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
							await	executeShellScript(
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
							await	executeShellScript(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);
//; @end-template-engine-code-space;

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
					const actualValue = (
						await	$moduleVariableNamespace(
									(
										true
									)
								)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-sample-unit;",

								"test sample unit;",

								`must assert to, ${ testValue };`
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
