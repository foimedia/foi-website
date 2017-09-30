import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.video`
  opacity: .05;
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
`

export default class Video extends Component {
  render () {
    return (
      <Wrapper autoPlay loop muted playsInline>
        <source src={require('images/glitch_web.mp4')} type="video/mp4" />
      </Wrapper>
    )
  }
}
