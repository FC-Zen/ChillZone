module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-env', // Ajouté pour Jest
      '@babel/preset-react', // Gère JSX
      '@babel/preset-typescript' // Gère TypeScript
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@contexts': './src/contexts',
            '@enums': './src/enums',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theme': './src/theme',
            '@translations': './src/translations',
            '@types': './src/types',
            '@utils': './src/utils',
            '@mocks': './jest/',
          },
        },
      ],
      ['module:react-native-dotenv'],
      '@babel/plugin-transform-modules-commonjs', // Nécessaire pour Jest
    ],
  };
};
