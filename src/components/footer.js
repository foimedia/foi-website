import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  text-align: center;
  margin: 5vh;
  font-size: 4vh;
  a {
    color: #fff;
    text-decoration: none;
  }
  a:hover {
    color: #ff4646;
  }
`;

export default class Footer extends Component {
  render () {
    return (
      <Wrapper>
        <a href="https://github.com/foimedia/foi" className="fa fa-github" title="GitHub" rel="external"></a>
      </Wrapper>
    )
  }
}
