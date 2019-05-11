# react-thrive-checkout
React components for Thrive's checkout payments flow.

#### Implementation

Get started by installing with npm</br>
```npm install react-thrive-checkout```

A simple implementation of the Thrive checkout might look like this:
```
import React from 'react';
import ThrivePopupBtn from 'react-thrive-checkout';

class ThriveCheckout extends React.Component {
  tokenCallback(token) {
    const result = fetch('https://backendUrl/receiveToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tokenId: token.id, amountInCents: token.amountInCents}),
    }).then(response => alert(response));
    return result
  }

  render() {
    return (
      <div className="ThriveCheckout">
          <ThrivePopupBtn
            publicKey='pk_test_ed3c54a6gOol69qa7f44'
            amountInCents={100}
            callback={this.tokenCallback}
          >
          </ThrivePopupBtn>
      </div>
    );
  }
}

export default ThriveCheckout;
```

This renders a Thrive button like this:
`Insert image here`
