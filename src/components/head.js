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
  constructor (props) {
    super(props);
    if(site.languageUrl == 'pathname') {
      this.languageUrl = '/';
    } else {
      this.languageUrl = '?lang=';
    }
  }
  getWithoutRegionCode (l) {
    return l.toLowerCase().split(/[_-]+/)[0];
  }
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
          {window.locales.map(l => ([
            <link rel="alternate" hreflang={l.toLowerCase()} href={`${site.url}${this.languageUrl}${l}`} />,
            <link rel="alternate" hreflang={this.getWithoutRegionCode(l)} href={`${site.url}${this.languageUrl}${this.getWithoutRegionCode(l)}`} />
          ]))}
          <link rel="alternate" hreflang="x-default" href={site.url} />
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
