import React, { Component } from 'react';
import styled from 'styled-components';
import Snap from 'snapsvg';
import { media } from 'styles';

const Wrapper = styled.section`
  margin: 0 -.25rem -1.5rem;
  background: #191919;
  svg {
    width: 100%;
    height: auto;
  }
  ${media.phablet`
    background: transparent;
    margin: 0 2rem 5vw;
  `}
  ${media.tablet`
    margin: 0 10vw 5vw;
  `}
`

export default class Demo extends Component {
  constructor (props) {
    super(props);
    this.duration = 8000;
  }
  componentDidMount () {
    const node = this.svg;
    this.snap = Snap(this.svg);
    Snap.load(require('images/demo.svg'), data => {
      if(node) {
        node.appendChild(data.node);
        this.snap.select('#foi-photo').attr('xlink:href', require('images/police.jpg'));
        this.animateLogos();
        this.animateMessages(this.duration);
      }
    });
  }
  animateLogos () {
    const s = this.snap;
    const duration = this.duration/5;
    const delay = duration/2;
    let active = 0;
    s.select('#swap-logos').attr({style: 'opacity:.4'});
    const logos = [
      s.select('#swap-logos-foi'),
      s.select('#swap-logos-website'),
      s.select('#swap-logos-twitter'),
      s.select('#swap-logos-facebook')
    ];
    logos.forEach((logo, i) => {
      if(i !== active) {
        logo.attr({style: 'opacity:0'});
      }
    });
    setInterval(() => {
      logos[active].animate({opacity: 0}, 200);
      setTimeout(function() {
        active++;
        if(!logos[active]) active = 0;
        logos[active].animate({opacity: 1}, 200);
      }, 300);
    }, duration);
  }
  animateMessages (duration) {
    const animationDuration = duration/2;
    const itemDuration = animationDuration/6;
    const holdDuration = duration/2;

    const messages = this.snap.select('#foi-messages');
    const output = this.snap.select('#output-messages');

    // Wait promise
    const wait = timeout => () => new Promise(resolve => {
      setTimeout(resolve, timeout);
    });

    const messageItems = [
      [
        messages.select('#foi-message-1'),
        output.select('#output-message-1')
      ],
      [
        messages.select('#foi-message-2'),
        output.select('#output-message-2')
      ],
      [
        messages.select('#foi-message-3'),
        output.select('#output-message-3')
      ],
    ];

    const showMessageItems = (index, resolve) => () => {
      const items = messageItems[index];
      items.forEach((message, i) => {
        message.animate({opacity: 1}, 400, null, () => {
          if(i === items.length-1 && typeof resolve == 'function') {
            resolve();
          }
        });
      });
    };

    // Animation steps
    const steps = [
      () => new Promise((resolve, reject) => {
        // Initial state
        messages.transform('t0,170');
        output.transform('t0,-60');
        messages.attr('style', 'opacity: 1');
        output.attr('style', 'opacity: 1');
        messageItems.forEach(messages => {
          messages.forEach(message => {
            message.attr('style', 'opacity: 0');
          });
        });
        resolve();
      }),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,-43'}, itemDuration, null);
        messages.animate({transform: 't0,112'}, itemDuration, null, showMessageItems(0, resolve));
      }),
      wait(itemDuration),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,-30'}, itemDuration, null);
        messages.animate({transform: 't0,84'}, itemDuration, null, showMessageItems(1, resolve));
      }),
      wait(itemDuration),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,0'}, itemDuration, null);
        messages.animate({transform: 't0,0'}, itemDuration, null, showMessageItems(2, resolve));
      }),
      wait(holdDuration),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,-75', opacity: 0}, itemDuration, null);
        messages.animate({transform: 't200,0', opacity: 0}, itemDuration, null, resolve);
      })
    ];

    // Animation loop
    const run = () => steps.reduce((p, a) => p.then(a), Promise.resolve()).then(run);

    // Init run
    run();

  }
  render () {
    return (
      <Wrapper>
        <div ref={node => this.svg = node } />
      </Wrapper>
    )
  }
}
