import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';

class CoinData extends Component {
  get popup() {
    return (
      <Popup
        trigger={
          <div>
            {this.props.children}
          </div>
        }
        header={this.props.header}        
        content={this.props.content}
      />
    )
  }

  render() {
    let html = null;

    if (this.props.header) {
      html = this.popup;
    } else {
      html = this.props.children;
    }

    return(
      <td>
        {html}
      </td>
    )
  }
}

export default CoinData;
