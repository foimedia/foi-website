import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { media } from 'styles';

const Wrapper = styled.h3`
  font-weight: normal;
  color: #fff;
  max-width: 1000px;
  font-family: 'Inconsolata';
  letter-spacing: .25vw;
  margin: 0;
  padding: 2rem 1rem;
  font-size: 1.2em;
  background: #191919;
  ${media.phablet`
    background: transparent;
    margin: 0 0 5vw;
    padding: 2rem;
    font-size: 2.2em;
  `}
  ${media.tablet`
    font-size: 2.4em;
    padding: 0 5vw 0 8vw;
    margin: 2vw 0 8vw;
    border-left: 2vw solid #fff;
  `}
  ${media.desktop`
    font-size: 2.6em;
  `}
  ${media.desktopHD`
    font-size: 3em;
  `}
`

export default class Headline extends Component {
  render () {
    return (
      <Wrapper>
        <FormattedMessage
          id="general.headline"
          defaultMessage={`Real-time coverage of events for journalists and activists.`}
          />
      </Wrapper>
    )
  }
}
