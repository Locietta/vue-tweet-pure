import path from 'path'

export default {
  // For all supported files in any package
  '**/*.{js,jsx,ts,tsx,vue}': (files) => {
    // Convert file paths to package names
    const packages = new Set(
      files
        .map((file) => path.relative(process.cwd(), file))
        .filter((file) => file.startsWith('packages/'))
        .map((file) => file.split(path.sep)[1]),
    )

    // Run format and lint for affected packages only
    return [
      `prettier --write ${files.join(' ')}`,
      `pnpm lint --filter=${[...packages].join(',')} --parallel`,
    ]
  },
}
