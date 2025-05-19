import { defineConfig } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig( {
	entry		: [ 'src/**/*.ts' ],
	format		: [ 'cjs', 'esm' ],
	dts			: true,
	splitting	: false,
	shims		: true,
	skipNodeModulesBundle: true,
	clean		: true,
	treeshake	: true,
	minify		: isProduction,
	sourcemap	: ! isProduction,
} )