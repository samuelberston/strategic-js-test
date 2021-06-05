module.exports = (api) => {
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/plugin-transform-react-jsx',
  ];

  api.cache(false);

  return {
    presets,
    plugins,
  };
};
