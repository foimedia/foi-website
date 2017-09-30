import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

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

import Video from 'components/video';
import Header from 'components/header';
import Headline from 'components/headline';
import Demo from 'components/demo';
import Footer from 'components/footer';

import Content from 'components/content';

ReactDom.render(
  <Wrapper>
    <Video />
    <Header />
    <Headline />
    <Demo />
    <Content />
    <Footer />
  </Wrapper>,
  document.getElementById('app')
);
