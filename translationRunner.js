const { default: manageTranslations } = require('react-intl-translations-manager');

manageTranslations({
  messagesDirectory: './build/messages',
  translationsDirectory: './src/locales/',
  languages: ['en', 'pt-BR'],
  singleMessagesFile: true
});
