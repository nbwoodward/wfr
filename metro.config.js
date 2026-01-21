const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add markdown file support
config.resolver.sourceExts.push('md');

// Use custom transformer for markdown files
config.transformer.babelTransformerPath = path.resolve(__dirname, 'metro-md-transformer.js');

module.exports = withNativeWind(config, { input: './global.css' });
