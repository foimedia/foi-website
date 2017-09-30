import React, { Component } from 'react';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const messages = defineMessages({
  subscribe: {
    id: 'form.subscribe',
    defaultMessage: 'Subscribe'
  }
});

const Wrapper = styled.form`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  margin: 0 -.5rem;
  p.field,
  .field-group {
    flex: 1 1 auto;
    margin: 0 0 .5rem;
    padding: 0 .5rem;
    box-sizing: border-box;
    min-width: 180px;
    &.full {
      width: 100%;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .required {
      color: red;
      font-size: .8em;
    }
  }
  .field-group {
    margin: 0 -.5rem;
    p.field {
      margin: 0;
    }
  }
  p.field {
    color: #999;
    &.checkbox-field {
      color: #333;
    }
  }
  label {
    font-size: .75em;
    input[type="text"],
    input[type="email"],
    textarea {
      box-sizing: border-box;
      display: block;
      border: 0;
      border-bottom: 1px solid #f7f7f7;
      width: 100%;
      outline: none;
      font-family: "Inconsolata", monospace;
      padding-bottom: .5rem;
      background: transparent;
      line-height: 1.5;
      transition: border-color .2s linear;
      &:active,
      &:focus {
        border-color: #ddd;
      }
    }
    input[type="checkbox"] {
      display: inline-block;
      margin: .5rem .5rem 0 0;
    }
  }
  input[type="submit"] {
    flex: 0;
    font-family: "Inconsolata", monospace;
    background: #ff4646;
    color: #fff;
    border: 0;
    padding: .75rem;
    font-size: .8em;
    width: 100%;
    border-radius: 2rem;
    text-transform: uppercase;
    display: block;
    text-align: center;
    cursor: pointer;
    margin-top: .5rem;
    &:hover,
    &:focus,
    &:active {
      background: #ff6060;
    }
  }
`

class Form extends Component {
  render () {
    const { intl } = this.props;
    return (
      <Wrapper id="subscription">
        <p className="field">
          <label>
            <FormattedMessage id="form.name" defaultMessage="Name" />
            <span className="required"> *</span>
            <input name="name" type="text" />
          </label>
        </p>
        <p className="field">
          <label>
            <FormattedMessage id="form.email" defaultMessage="Email" />
            <span className="required"> *</span>
            <input name="email" type="email" />
          </label>
        </p>
        <p className="field">
          <label>
            <FormattedMessage id="form.organization" defaultMessage="Organization" />
            <input name="organization" type="text" />
          </label>
        </p>
        <p className="field full">
          <label>
            <FormattedMessage id="form.comments" defaultMessage="Additional comments" />
            <textarea name="comments" />
          </label>
        </p>
        <div className="field-group">
          <p className="field checkbox-field">
            <label>
              <input name="journalist" type="checkbox" />
              <FormattedMessage id="form.journalist" defaultMessage="Are you a journalist?" />
            </label>
          </p>
          <p className="field checkbox-field">
            <label>
              <input name="activist" type="checkbox" />
              <FormattedMessage id="form.activist" defaultMessage="Are you an activist?" />
            </label>
          </p>
        </div>
        <p className="field">
          <input type="submit" value={intl.formatMessage(messages.subscribe)} />
        </p>
      </Wrapper>
    )
  }
}

Form.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Form);
