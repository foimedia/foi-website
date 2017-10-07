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
          <link rel="canonical" href="https://www.foi.media" />
      </Helmet>
    )
  }
}

Head.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Head);
