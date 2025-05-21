import type { JestConfigWithTsJest } from 'ts-jest'
import dotenv from 'dotenv'

console.log(
`
____________________________________________________
     _       __     __       __  ____  _ __
    | |     / /__  / /_     / / / / /_(_) /____
    | | /| / / _ \\/ __ \\   / / / / __/ / / ___/
    | |/ |/ /  __/ /_/ /  / /_/ / /_/ / (__  )
    |__/|__/\\___/_.___/   \\____/\\__/_/_/____/
____________________________________________________
`
)

const env = process.env.NODE_ENV

dotenv.config( { path: [
	`.env.${ env }.local`,
	`.env.${ env }`,
	'.env.local',
	'.env'
] } )


/**
 * Initial file generated with `npx ts-jest config:init`
 * 
 */
const config: JestConfigWithTsJest = {
	/** https://jestjs.io/docs/configuration#testenvironment-string */
	testEnvironment: 'node',
	moduleDirectories: [ 'node_modules', '<rootDir>/' ],
	setupFilesAfterEnv: [ './jest.setup.ts' ],
	testMatch: [ '**/__tests__/**/*.(test|spec).ts' ],
	/**
	 * If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
	 * you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
	 * The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
	 */
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+.tsx?$': [ 'ts-jest', {} ],
	},
}

export default config