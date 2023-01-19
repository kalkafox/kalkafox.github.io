import packageData from "../package.json" assert {type: "json"}


console.log(packageData.version)

const version_data = {
  ASTRO_VERSION: packageData.dependencies.astro.replace("^", ""),
  PROJECT_VERSION: packageData.version,
}

await Deno.writeTextFile("./src/util/version.ts", `export default ${JSON.stringify(version_data)}`)

