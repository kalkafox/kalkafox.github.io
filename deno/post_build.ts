import { walk } from 'https://deno.land/std@0.173.0/fs/mod.ts'

for await (const entry of walk('src/.well-known')) {
  // If the entry is a directory, create a new directory in the destination
  // folder with the same name.
  if (entry.isDirectory) {
    try {
      await Deno.mkdir(entry.path.replace('src', 'dist'), { recursive: true })
    } catch (err) {
      if (err && err.name === 'AlreadyExists') {
        // Ignore the error if the directory already exists.
      } else {
        throw err
      }
    }
  }

  if (entry.isFile) {
    await Deno.copyFile(entry.path, entry.path.replace('src', 'dist'))
  }
}
