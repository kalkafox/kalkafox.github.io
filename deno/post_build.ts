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

const interpret_file_size = (size: number) => {
  if (size < 1024) {
    return `${size} bytes`
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const table_unicodes: Record<string, string> = {
  'top-left': '┌',
  'top-right': '┐',
  'bottom-left': '└',
  'bottom-right': '┘',
  vertical: '│',
  horizontal: '─',
  'top-mid': '┬',
  'bottom-mid': '┴',
  'left-mid': '├',
  'mid-mid': '┼',
  'right-mid': '┤',
  middle: '│',
}

const files: { path: string; size: number; width_length: number }[] = []

for await (const entry of walk('dist')) {
  if (entry.isFile) {
    const file_size = await Deno.stat(entry.path)
    files.push({
      path: entry.path.replace('dist\\', ''),
      size: file_size.size,
      width_length: entry.path.replace('dist\\', '').length + 1,
    })
  }
}

const total_size = files.reduce((acc, file) => acc + file.size, 0)

// Get the longest file path length
const longest_file_path = files.reduce((acc, file) => {
  if (file.width_length > acc) {
    return file.width_length
  }
  return acc
}, 0)

const table_width = longest_file_path + 10

console.log(`${table_unicodes['top-left']}${table_unicodes['horizontal'].repeat(
  table_width - 9,
)}${table_unicodes['top-mid']}${table_unicodes['horizontal'].repeat(
  interpret_file_size(total_size).length + 4,
)}${table_unicodes['top-right']}
${table_unicodes['vertical']} File${' '.repeat(longest_file_path - 4)}${
  table_unicodes['vertical']
} Size${' '.repeat(6)}${table_unicodes['vertical']}
${table_unicodes['left-mid']}${table_unicodes['horizontal'].repeat(
  table_width - 9,
)}${table_unicodes['mid-mid']}${table_unicodes['horizontal'].repeat(
  interpret_file_size(total_size).length + 4,
)}${table_unicodes['right-mid']}`)

for (const file of files) {
  console.log(
    `${table_unicodes['vertical']} ${file.path}${' '.repeat(
      longest_file_path - file.path.length,
    )}${table_unicodes['vertical']} ${interpret_file_size(
      file.size,
    )}${' '.repeat(10 - interpret_file_size(file.size).length)}${
      table_unicodes['vertical']
    }`,
  )
}
console.log(`${table_unicodes['left-mid']}${table_unicodes.horizontal.repeat(
  longest_file_path + 1,
)}${table_unicodes['mid-mid']}${table_unicodes.horizontal.repeat(
  4 + interpret_file_size(total_size).length,
)}${table_unicodes['right-mid']}
${table_unicodes['vertical']} Total${' '.repeat(longest_file_path - 5)}${
  table_unicodes['vertical']
} ${interpret_file_size(total_size)}${' '.repeat(
  10 - interpret_file_size(total_size).length,
)}${table_unicodes['vertical']}
${table_unicodes['bottom-left']}${table_unicodes['horizontal'].repeat(
  table_width - 9,
)}${table_unicodes['bottom-mid']}${table_unicodes['horizontal'].repeat(
  4 + interpret_file_size(total_size).length,
)}${table_unicodes['bottom-right']}`)
