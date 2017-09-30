import React, { Component } from 'react';
import styled from 'styled-components';

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
      border-bottom: 1px solid #ddd;
      width: 100%;
      outline: none;
      font-family: "Inconsolata", monospace;
      padding-bottom: .5rem;
      background: transparent;
      line-height: 1.5;
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

export default class Form extends Component {
  render () {
    return (
      <Wrapper id="subscription">
        <p className="field">
          <label>
            Name <span className="required">*</span>
            <input name="name" type="text" />
          </label>
        </p>
        <p className="field">
          <label>
            Email <span className="required">*</span>
            <input name="email" type="email" />
          </label>
        </p>
        <p className="field">
          <label>
            Organization
            <input name="organization" type="text" />
          </label>
        </p>
        <p className="field full">
          <label>
            Additional comments
            <textarea name="comments" />
          </label>
        </p>
        <div className="field-group">
          <p className="field checkbox-field">
            <label>
              <input name="journalist" type="checkbox" />
              Are you a journalist?
            </label>
          </p>
          <p className="field checkbox-field">
            <label>
              <input name="activist" type="checkbox" />
              Are you an activist?
            </label>
          </p>
        </div>
        <p className="field">
          <input type="submit" value="Subscribe" />
        </p>
      </Wrapper>
    )
  }
}
