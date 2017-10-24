const { default: manageTranslations } = require('react-intl-translations-manager');

manageTranslations({
  messagesDirectory: './build/messages',
  translationsDirectory: './src/locales/',
  languages: ['en', 'es', 'pt-BR'],
  singleMessagesFile: true
});
