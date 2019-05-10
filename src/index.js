import React from 'react';
import { buttonStyle, textStyle } from './styles';

class ThrivePopupBtn extends React.Component {
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
        window.ThrivePopup = window.ThrivePopup || window.YocoPopup;
        this.props.hasLoadedCallback && this.props.hasLoadedCallback();
        this.setState({ popupHasLoaded: true });
    }

    callback(response) {
        response.amountInCents = amountInCents
        console.log("callback playing, response----> ", response)
    }

    showPopup() {
        if (ThrivePopup) {
            console.info('Loading Popup');

            ThrivePopup.setup({
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

    validFieldParams() {
        const errors = [];

        if (!this.props.publicKey) {
            errors.push('publicKey field is empty');
        }
        if (!this.props.amountInCents || isNaN(this.props.amountInCents)) {
            console.log(this.props.amountInCents)
            errors.push('amountInCents field is invalid');
        } else if (this.props.amount <= 0) {
            errors.push('amountInCents must be larger than 0');
        }

        if (errors.length == 0) {
            return (true);
        } else {
            for (const err of errors) {
                console.error(err)
            }
            return (false);
        }
    }

    handleButtonClick() {
        if (this.state.popupHasLoaded && this.validFieldParams()) {
            this.showPopup();
        }
    }

    renderChildren() {
        return (
            <p style={this.state.popupHasLoaded ? textStyle.default : textStyle.disabled}>
                Pay Now
            </p>
        );
    }

    render() {
        return (
            <button
                onClick={() => this.handleButtonClick()}
                style={this.props.buttonStyle || (this.state.popupHasLoaded ? buttonStyle.default : buttonStyle.disabled)}
            >
                {this.props.children ? this.props.children : this.renderChildren()}
            </button>
        );
    }
}

export default ThrivePopupBtn;
