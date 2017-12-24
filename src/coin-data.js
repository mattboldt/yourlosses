import React from 'react';
import { Popup } from 'semantic-ui-react';

const CoinData = (props) => {
  const popup = (
    <Popup
      trigger={
        <div>
          {props.children}
        </div>
      }
      header={props.header}
      content={props.content}
    />
  )

  let html = null;

  if (props.header) {
    html = popup;
  } else {
    html = props.children;
  }

  return(
    <td className={props.className}>
      {html}
    </td>
  )
}

export default CoinData;
