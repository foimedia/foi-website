import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { media } from "styles";

const Wrapper = styled.header`
  margin: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:after {
    display: block;
    content: "";
    clear: both;
  }
  ${media.phablet`
    margin: 5vw 2rem 5vw 2rem;
    flex-direction: row;
  `}
  ${media.tablet`
    margin: 5vw 10vw 5vw 10vw;
  `}
`;

const Title = styled.h1`
  color: #fff;
  margin: 5vw 0 2rem;
  flex: 0 0 auto;
  img {
    display: block;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    height: 4em;
  }
  ${media.phablet`
    margin: 0 0 0 -.5rem;
  `}
`;

const Subtitle = styled.h2`
  flex: 1 1 100%;
  font-family: "Inconsolata", monospace;
  font-size: 1em;
  letter-spacing: .1rem;
  font-weight: normal;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
  ${media.phablet`
    padding-left: 4rem;
  `}
  ${media.desktopHD`
    font-size: 1.2em;
  `}
`;

const Sponsor = styled.h3`
  flex: 0 0 auto;
  width: 20%;
  min-width: 150px;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          <img src={require("images/logo_white.svg")} alt="FOI" />
        </Title>
        <Subtitle>
          <FormattedMessage
            id="general.subtitle"
            defaultMessage={`FOI is a Publishing Bot`}
          />
        </Subtitle>
        <Sponsor>
          <a href="https://institutoupdate.org.br/" title="Instituto Update">
            <img alt="Instituto Update" src={require("images/update.png")} />
          </a>
        </Sponsor>
      </Wrapper>
    );
  }
}
