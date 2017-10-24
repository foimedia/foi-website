import 'intl';
import React from 'react';
import ReactDom from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import styled from 'styled-components';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
addLocaleData([...en, ...es, ...pt]);
window.locales = ['en-US', 'es', 'pt-BR'];

const Wrapper = styled.div`
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  text-rendering: geometricPrecision;
  font-smooth: grayscale;
  font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: grayscale;
  ::selection {
    background: #000;
  }
  ::-moz-selection {
    background: #000;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Inconsolata", monospace;
    font-weight: normal;
  }
`;

import localeData from './locales';

let query = {};
window.location.search.slice(1).split('&').map(item => { const arr = item.split('='); query[arr[0]] = arr[1]; });

const languagePath = window.location.pathname.split('/')[1];

const language = query.lang ||
                  languagePath ||
                  (navigator.languages && navigator.languages[0]) ||
                  navigator.language ||
                  navigator.userLanguage;

const findLocale = language => {
  let locale = false;
  const languageWRC = language.toLowerCase().split(/[_-]+/)[0];
  for(const key in localeData) {
    let keyWRC = key.toLowerCase().split(/[_-]+/)[0];
    if(!locale &&
      (key == language || key == languageWRC || keyWRC == languageWRC || keyWRC == language)
    ) {
      locale = key;
    }
  }
  return locale;
};

const messages = localeData[findLocale(language)] || localeData.en;

import Head from 'components/head';

import Video from 'components/video';
import Header from 'components/header';
import Headline from 'components/headline';
import Demo from 'components/demo';
import Footer from 'components/footer';

import Content from 'components/content';

ReactDom.render(
  <IntlProvider locale={language} messages={messages}>
    <Wrapper>
      <Head />
      <Video />
      <Header />
      <Headline />
      <Demo />
      <Content />
      <Footer />
    </Wrapper>
  </IntlProvider>,
  document.getElementById('app')
);
