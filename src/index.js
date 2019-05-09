import React from 'react';
import buttonStyle from './buttonStyle';

class Thrive extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            popupHasLoaded: false,
        }

        this.showPopup = this.showPopup.bind(this);
    }

    componentWillMount() {
        if(!window.YocoPopup){
            const popupScript = document.createElement('script');
            popupScript.src = 'https://online.yoco.com/v1/popup.js';
            popupScript.onload = () => this.onScriptLoaded();
            document.getElementsByTagName('head')[0].appendChild(popupScript);
        }else{
            this.onScriptLoaded()
        }
    }
    
    onScriptLoaded() {
        this.props.hasLoadedCallback && this.props.hasLoadedCallback();
        this.setState({ popupHasLoaded: true });
    }

    callback(response) {
        response.amountInCents = amountInCents
        console.log("callback playing, response----> ", response)
    }

    showPopup() {
        let Popup = window.YocoPopup;
        if (Popup) {
            console.info('Loading Popup');

            Popup.setup({
            publicKey: this.props.publicKey || '',
            amountInCents: this.props.amountInCents || 0,
            currency: this.props.currency || 'ZAR',
            email: this.props.email || '',
            firstName: this.props.firstName || '',
            lastName: this.props.lastName || '',
            description: this.props.description || '',
            businessId: this.props.businessId || 'test-bus',
            name: this.props.name || 'Business Name',
            image: this.props.image || '',
            businessDescription: this.props.businessDescription || '',
        
            fsShared: false,
            callback: (response => this.props.callback(response)) || (response => this.callback(response))
          }).open()
        } else {
            console.error('Popup loading failed');
        }
    }

    renderChildren() {
        if (this.props.children) {
            return (this.props.children);
        } else {
            if (this.state.popupHasLoaded) {
                return ('Enter Card Details');
            } else {
                return ('Loading');
            }
        }
    }

    render() {
        return (
            <button
                onClick={this.showPopup}
                style={this.props.style || buttonStyle}
            >
                {this.renderChildren()}
            </button>
        );
    }
}

export default Thrive;
