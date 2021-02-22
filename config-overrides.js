const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@H050': '#f2f7ff',
        '@H100': '#becee8',
        '@H200': '#90a9d4',
        '@H300': '#6684bd',
        '@H400': '#4365a8',
        '@H500': '#264892',
        '@H600': '#1b3d8c',
        '@H700': '#103082',
        '@H800': '#062373',
        '@H900': '#00185e',
        '@primary-color': '#3072C4',
        '@border-radius-base': '2px',
        '@text-color': '#333333',
        '@font-family-base': '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif',
        '@input-border-width': '1.2px',
      }
    }
  })
);