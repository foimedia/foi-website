import React, { Component } from 'react';
import { injectIntl, intlShape, defineMessages, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import axios from 'axios';

const api = mailing.api; // defined through webpack

const messages = defineMessages({
  subscribe: {
    id: 'form.subscribe',
    defaultMessage: 'Subscribe'
  },
  name_empty: {
    id: 'form.validation.name_empty',
    defaultMessage: 'You must provide a name.'
  },
  email_empty: {
    id: 'form.validation.email_empty',
    defaultMessage: 'You must provide an email.'
  },
  email_invalid: {
    id: 'form.validation.email_invalid',
    defaultMessage: 'Invalid email.'
  },
  unexpected_error: {
    id: 'form.validation.unexpected_error',
    defaultMessage: 'An unexpected error occured, please refresh your page and try again.'
  }
});

const Wrapper = styled.form`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  margin: 0 -.5rem;
  p {
    padding: 0 .5rem;
  }
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
  .processing-form {
    margin-top: .5rem;
    padding: .75rem;
    font-size: .8em;
    text-align: center;
    display: block;
    color: #ff4646;
  }
`

const Message = styled.div`
  flex: 1 1 100%;
  margin: 0 0 1rem;
  border: 1px solid #ddd;
  padding: .5rem 1rem;
  font-size: .8em;
  .fa {
    margin-right: 1rem;
  }
  ${props => props.error && css`
    color: red;
    border-color: red;
    margin-left: .5rem;
    margin-right: .5rem;
  `}
  ${props => props.success && css`
    color: green;
    margin: 0;
    border-color: green;
  `}
`

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formData: {},
      validation: {
        email: true
      },
      processing: false,
      sent: false,
      err: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  subscribe () {
    const { formData } = this.state;
    this.setState({
      processing: true
    });
    axios.post(`${api}/subscribe`, formData)
      .then(data => {
        this.setState({ sent: true, processing: false });
      })
      .catch(error => {
        let err = error.response ? error.response.data : 'unexpected_error';
        if(!messages[err]) err = 'unexpected_error';
        this.setState({ err, processing: false });
      });
  }
  handleChange (event) {
    const { formData } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      formData: { ...formData, [target.name]: value }
    });
  }
  handleSubmit (ev) {
    ev.preventDefault();
    const { processing, sent } = this.state;
    if(!processing && !sent) {
      this.subscribe();
    }
  }
  // On blur email validation
  handleEmail (ev) {
    const email = ev.target.value;
    const { validation } = this.state;
    if(email) {
      // axios.post(`${api}/validate`, { email: email })
      //   .then(() => {
      //     this.setState({
      //       validation: { ...validation, email: true }
      //     });
      //   })
      //   .catch(() => {
      //     this.setState({
      //       validation: { ...validation, email: false }
      //     });
      //   })
    }
  }
  render () {
    const { err, processing, sent, validation } = this.state;
    const { intl } = this.props;
    if(sent) {
      return (
        <Message success>
          <span className="fa fa-check" />
          <FormattedMessage
            id="form.success"
            defaultMessage="Thank you for subscribing!"
            />
        </Message>
      )
    } else {
      return (
        <Wrapper id="subscription" onSubmit={this.handleSubmit}>
          <p><FormattedHTMLMessage id="form.intro" defaultMessage="If you are an individual or organization looking to use <strong>FOI</strong> and would like to receive updates, fill out the form below and we will keep in touch!" /></p>
          {err && !processing && (
            <Message error>
              <span className="fa fa-times-circle" />
              {intl.formatMessage(messages[err])}
            </Message>
          )}
          <p className="field">
            <label>
              <FormattedMessage id="form.name" defaultMessage="Name" />
              <span className="required"> *</span>
              <input name="name" type="text" onChange={this.handleChange} />
            </label>
          </p>
          <p className="field">
            <label>
              <FormattedMessage id="form.email" defaultMessage="Email" />
              <span className="required"> *</span>
              <input name="email" type="email" onChange={this.handleChange} onBlur={this.handleEmail} />
            </label>
          </p>
          <p className="field">
            <label>
              <FormattedMessage id="form.organization" defaultMessage="Organization" />
              <input name="organization" type="text" onChange={this.handleChange} />
            </label>
          </p>
          <p className="field full">
            <label>
              <FormattedMessage id="form.comments" defaultMessage="Additional comments" />
              <textarea name="comments" onChange={this.handleChange} />
            </label>
          </p>
          <div className="field-group">
            <p className="field checkbox-field">
              <label>
                <input name="journalist" type="checkbox" onChange={this.handleChange} />
                <FormattedMessage id="form.journalist" defaultMessage="I'm an activist" />
              </label>
            </p>
            <p className="field checkbox-field">
              <label>
                <input name="activist" type="checkbox" onChange={this.handleChange} />
                <FormattedMessage id="form.activist" defaultMessage="I'm a journalist" />
              </label>
            </p>
          </div>
          <p className="field">
            {processing &&
              <span className="processing-form">
                <span className="fa fa-circle-o-notch fa-spin" />
              </span>
            }
            {!processing &&
              <input type="submit" value={intl.formatMessage(messages.subscribe)} />
            }
          </p>
        </Wrapper>
      )
    }
  }
}

Form.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Form);
