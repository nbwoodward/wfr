const upstreamTransformer = require('@expo/metro-config/babel-transformer');

module.exports.transform = async ({ src, filename, options }) => {
  // Only process .md files
  if (filename.endsWith('.md')) {
    // Convert markdown file content to a JS module that exports the string
    const escaped = JSON.stringify(src);
    const moduleCode = `module.exports = ${escaped};`;

    return upstreamTransformer.transform({
      src: moduleCode,
      filename: filename.replace('.md', '.js'),
      options,
    });
  }

  // For all other files, use the default transformer
  return upstreamTransformer.transform({ src, filename, options });
};
