import Reflux from 'reflux';

export const Actions = Reflux.createActions([
  'getPublications',
  'getOnePublication',
  'postPublication',
  'editPublicationMessage',
  'editPublicationComments',
  'deletePublication',
  'getThemes',
  'getOneTheme',
  'postTheme',
  'editThemeTitle',
  'editThemePublicationsRelated',
  'deleteTheme'
]);
