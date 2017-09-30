import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { media } from 'styles';

const Wrapper = styled.header`
  margin: 4rem 0;
  &:after {
    display: block;
    content: "";
    clear: both;
  }
  ${media.phablet`
    margin: 5vw 0 5vw 2rem;
  `}
  ${media.tablet`
    margin: 5vw 0 5vw 10vw;
  `}
`;

const Title = styled.h1`
  color: #fff;
  margin: 5vw 0 2rem;
  img {
    display: block;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    height: 4em;
  }
  ${media.phablet`
    margin: 0 0 0 -.5rem;
    float: left;
  `}
`;

const Subtitle = styled.h2`
  font-family: "Inconsolata", monospace;
  font-size: 1em;
  letter-spacing: .1rem;
  font-weight: normal;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  ${media.phablet`
    float: left;
    margin: 3.5rem 0 0 5vw;
    padding-left: 2rem;
  `}
  ${media.tablet`
    margin: 3.5rem 0 0 10vw;
    padding-left: 0;
  `}
  ${media.desktopHD`
    font-size: 1.2em;
  `}
`;

export default class Header extends Component {
  render () {
    return (
      <Wrapper>
        <Title><img src={require('images/logo_white.svg')} alt="FOI" /></Title>
        <Subtitle><FormattedMessage
          id="general.subtitle"
          defaultMessage={`FOI is a Publishing Bot`}
         /></Subtitle>
      </Wrapper>
    )
  }
}
