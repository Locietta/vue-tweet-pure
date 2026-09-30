import path from 'path'

export default {
  // For all supported files in any package
  '**/*.{js,jsx,ts,tsx,vue}': (files) => {
    // Convert file paths to package names (split by path.sep, so it works on Windows too)
    const packages = new Set(
      files
        .map((file) => path.relative(process.cwd(), file).split(path.sep))
        .filter(([dir]) => dir === 'packages')
        .map(([, name]) => name),
    )

    // Run format and lint for affected packages only
    const commands = [`prettier --write ${files.join(' ')}`]
    if (packages.size > 0) {
      commands.push(`pnpm lint --filter=${[...packages].join(',')} --parallel`)
    }
    return commands
  },
}
