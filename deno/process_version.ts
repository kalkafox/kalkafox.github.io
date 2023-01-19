import packageData from '../package.json' assert { type: 'json' }
import * as log from "https://deno.land/std@0.171.0/log/mod.ts"

const version_data = {
  ASTRO_VERSION: packageData.dependencies.astro.replace('^', ''),
  PROJECT_VERSION: packageData.version,
}

log.info(`ASTRO_VERSION = ${version_data.ASTRO_VERSION}`)
log.info(`PROJECT_VERSION = ${version_data.PROJECT_VERSION}`)

await Deno.writeTextFile(
  './src/util/version.ts',
  `export default ${JSON.stringify(version_data)}`,
)

log.info('Version data written to src/util/version.ts')
