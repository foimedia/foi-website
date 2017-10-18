import React, { Component } from 'react-dom';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

const messages = defineMessages({
  title: {
    id: 'head.title',
    defaultMessage: 'FOI - Real-time coverage of events for journalists and activists.'
  },
  description: {
    id: 'head.description',
    defaultMessage: 'Free software for publishing and sharing multimedia live feeds through a bot.'
  }
});

class Head extends Component {
  render () {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);
    const description = intl.formatMessage(messages.description);
    return (
      <Helmet>
          <html lang={intl.locale} />
          <meta charset="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={site.url} />
          {window.locales.map(l => (
            <link rel="alternate" hreflang={l.toLowerCase()} href={`${site.url}?lang=${l}`} />
          ))}
          <meta property="og:url" content={site.url} />
          <meta property="og:image" content={`${site.url}${require('images/facebook-poster.jpg')}`} />
      </Helmet>
    )
  }
}

Head.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Head);
