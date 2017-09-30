import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'styles';

import Form from './form';

const Wrapper = styled.section`
  max-width: 600px;
  padding: 3rem 1rem 2rem;
  background: #fff;
  color: #333;
  margin: 0 auto;
  font-family: "Inconsolata";
  line-height: 1.5;
  font-size: 1.2em;
  ${media.phablet`
    border-top: 0;
    padding: 5vw;
  `}
  h3 {
    font-size: 1.4em;
    margin: 0 0 2rem;
    font-weight: normal;
  }
  p {
    margin: 0 0 1rem;
    ${media.phablet`
      margin: 0 0 2rem;
    `}
  }
  a {
    color: #000;
    border-bottom: 2px solid #ff4646;
    text-decoration: none;
    &:hover,
    &:active,
    &:focus {
      border-color: #000;
    }
  }
  ::selection {
    background: #ff4646;
  }
  ::-moz-selection {
    background: #ff4646;
  }
  strong {
    font-size: 1.1em;
  }
`;

export default class Content extends Component {
  render () {
    return (
      <Wrapper>
        <h3><strong>FOI</strong> is a free software for publishing and sharing multimedia live feeds through a bot.</h3>
        <p>We use a Telegram bot to publish your content so you can focus on your story and let the bot take care of the rest.</p>
        <p>The technology is currently under development. If you are a developer, designer, journalist or enthusiast interested in helping us out check out our <a href="https://github.com/foimedia/foi">GitHub repository</a>.</p>
        <p>If you are an individual or organization looking to use <strong>FOI</strong> on your projects, contact us at <a href="mailto:hi@foi.media">hi@foi.media</a>.</p>
        {/* <p>If you are an individual or organization looking to use <strong>FOI</strong> on your projects, fill out the form below and we will keep in touch!</p>
        <Form /> */}
      </Wrapper>
    )
  }
}
