import React, { Component } from 'react';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import styled from 'styled-components';
import Snap from 'snapsvg';
import { media } from 'styles';

const messages = defineMessages({
  title: {
    id: 'demo.title',
    defaultMessage: 'My Coverage'
  },
  subtitle: {
    id: 'demo.subtitle',
    defaultMessage: '10 members'
  },
  msgPlaceholder: {
    id: 'demo.msgPlaceholder',
    defaultMessage: 'Message'
  },
  website: {
    id: 'demo.website',
    defaultMessage: 'Your Website'
  },
  textMessage1: {
    id: 'demo.textMessage1',
    defaultMessage: 'Riot police has arrived,'
  },
  textMessage2: {
    id: 'demo.textMessage2',
    defaultMessage: 'tensions rises among protestors.'
  }
});

const Wrapper = styled.section`
  margin: 0 -.25rem -1.5rem;
  background: #191919;
  cursor: default;
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

// const easing = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };
const easing = function (t) { return t*t };

class Demo extends Component {
  constructor (props) {
    super(props);
    this.duration = 8000;
  }
  componentDidMount () {
    const node = this.svg;
    const { intl } = this.props;
    this.snap = Snap(this.svg);
    Snap.load(require('images/demo.svg'), data => {
      if(node) {
        node.appendChild(data.node);
        this.snap.select('#foi-photo').attr('xlink:href', require('images/police.jpg'));
        // Apply intl
        this.snap.select('#foi-header-title tspan')
          .node.textContent = intl.formatMessage(messages.title);
        this.snap.select('#foi-header-title-1 tspan')
          .node.textContent = intl.formatMessage(messages.subtitle);
        this.snap.select('#foi-message-label tspan')
          .node.textContent = intl.formatMessage(messages.msgPlaceholder);
        this.snap.select('#swap-logos-website tspan')
          .node.textContent = intl.formatMessage(messages.website);
        this.snap.select('.output-text-message tspan:nth-child(1)')
          .node.textContent = intl.formatMessage(messages.textMessage1);
        this.snap.select('.output-text-message tspan:nth-child(2)')
          .node.textContent = intl.formatMessage(messages.textMessage2);
        this.snap.select('.foi-text-message tspan:nth-child(1)')
          .node.textContent = intl.formatMessage(messages.textMessage1);
        this.snap.select('.foi-text-message tspan:nth-child(2)')
          .node.textContent = intl.formatMessage(messages.textMessage2);
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
      // if(i !== active) {
        logo.attr({style: 'opacity:0'});
      // }
    });
    // setInterval(() => {
    //   logos[active].animate({opacity: 0}, 200, easing);
    //   setTimeout(function() {
    //     active++;
    //     if(!logos[active]) active = 0;
    //     logos[active].animate({opacity: 1}, 200, easing);
    //   }, 300);
    // }, duration);
  }
  animateMessages (duration) {
    const animationDuration = duration/2;
    const itemDuration = 400;
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
        message.animate({opacity: 1}, 400, easing, () => {
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
        output.animate({transform: 't0,-43'}, itemDuration, easing);
        messages.animate({transform: 't0,112'}, itemDuration, easing, showMessageItems(0, resolve));
      }),
      wait(itemDuration*2),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,-30'}, itemDuration, easing);
        messages.animate({transform: 't0,84'}, itemDuration, easing, showMessageItems(1, resolve));
      }),
      wait(itemDuration*2),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,0'}, itemDuration, easing);
        messages.animate({transform: 't0,0'}, itemDuration, easing, showMessageItems(2, resolve));
      }),
      wait(holdDuration),
      () => new Promise((resolve, reject) => {
        output.animate({transform: 't0,-75', opacity: 0}, itemDuration, easing);
        messages.animate({transform: 't200,0', opacity: 0}, itemDuration, easing, resolve);
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

Demo.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Demo);
