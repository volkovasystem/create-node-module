"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) {{ @license-year }}-present {{ @author-title-namespace }} <{{ @author-contact-detail }}>

		@copyright:
			{{ @author-title-namespace }}

			<
				@license-year-range:
					{{ @license-year }}-present
				@end-license-year-range
			>

			<
				@contact-detail:
					{{ @author-contact-detail }}
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

const util = require( "util" );

const $moduleVariableNamespace = (
	async	function $moduleVariableNamespace( sampleParameter ){
				/*;
					@procedure-definition:
						{{ @module-description }}
					@end-procedure-definition

					@parameter-definition:
						{
							"sampleParameter": "
								[
									@type:
											string
									@end-type
								]
							"
						}
					@end-parameter-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											string
									@end-type
								]
							"
						}
					@end-result-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:cannot-{{ @module-value-namespace }};>
								]
							"
						}
					@end-trigger-definition
				*/

				try{
					return	(
								sampleParameter
							);
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-{{ @module-value-namespace }};",

												"cannot {{ @module-value-title-namespace }};",
												"cannot execute {{ @module-value-title-namespace }};",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = $moduleVariableNamespace;
