import * as React from 'react';
import * as request from 'request';
import { validateSync, IsEmail, MinLength } from "class-validator";
import * as Config from './../../config';
import * as styles from './ContactForm.css';

interface IContactFormProps {
}

interface IContactFormState {
    name?: string,
    email?: string,
    phone?: string,
    companyName?: string,
    subject?: string,
    message?: string,
    errors?: Array<string>,
    invalidKeys?: Array<string>,
    sendButtonWasClicked?: boolean,
    requestWasSuccesful?: boolean,
    requestResponse?: string 
}

class RequestBody {

    constructor(state: IContactFormState) {
        this.name = state.name;
        this.email = state.email;
        this.phone = state.phone;
        this.companyName = state.companyName;
        this.subject = state.subject;
        this.message = state.message;
    }

    @MinLength(3, { message: 'Name: must be at least 3 characters' })
    name: string;
    @IsEmail({}, { message: 'Email: must be a valid email address' })
    email: string;
    phone: string;
    companyName: string;
    @MinLength(3, { message: 'Subject: must be at least 3 characters' })
    subject: string;
    @MinLength(10, { message: 'Message: must be at least 10 characters' })
    message: string;

    toJSON() {
        return JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            companyName: this.companyName,
            subject: this.subject,
            message: this.message
        });
    }

}

interface IFormControlOptions {
    formControlType?: 'input' | 'textarea'
    formShouldReset?: boolean
}

class ContactForm extends React.Component<IContactFormProps, IContactFormState> {

    constructor(props: IContactFormProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            companyName: '',
            subject: '',
            message: '',
            errors: [],
            invalidKeys: [],
            sendButtonWasClicked: false,
            requestWasSuccesful: false,
            requestResponse: ''
        }
    }

    onSendButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let requestBody = new RequestBody(this.state);
        let validationErrors = validateSync(requestBody);
        if (validationErrors.length == 0) {
            this.sendRequest(requestBody);
        }
        let errors = validationErrors.map(function (validationError) { return Object.values(validationError.constraints)[0] });
        let invalidKeys = validationErrors.map(function (validationError) { return validationError.property });
        this.setState({ errors: errors, invalidKeys: invalidKeys, sendButtonWasClicked: true });
    }

    onFormControlChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
        this.setState({ [key]: event.target['value'] });
    }

    renderFormControl(key: string, title: string, options: IFormControlOptions = { formControlType: 'input' }) {
        let style = (this.state.invalidKeys.indexOf(key) != -1) ? styles.invalid : '';
        let formControl = (options.formControlType == 'input') ? <input onChange={(e) => this.onFormControlChange(e, key)} type='text' />
            : <textarea onChange={(e) => this.onFormControlChange(e, key)} />;
        return (
            <div>
                <label className={style}>{title}</label>
                {formControl}
            </div>
        )
    }

    renderErrors() {
        if (this.state.errors.length == 0) return;
        let errors = this.state.errors.map(function (error, index) {
            return <li key={index}>{error}</li>
        })
        return (
            <div>
                <h3>Please fix the following error(s)</h3>
                <ul>
                    {errors}
                </ul>
            </div>
        )
    }

    sendRequest(requestBody: RequestBody) {
        let headers = {
            'Content-Type': 'application/json'
        }

        let body = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            companyName: this.state.companyName,
            subject: this.state.subject,
            message: this.state.message
        }

        let options = {
            url: Config.CONTACT_LAMBDA_PATH,
            method: 'POST',
            headers: headers,
            body: requestBody.toJSON()
        }

        console.log('sending message with body: ', JSON.stringify(body));

        let callback = (error, response, body) => {
            let parsedBody = JSON.parse(body);
            if (error) {
                this.setState({ requestWasSuccesful: false, requestResponse: parsedBody.message, sendButtonWasClicked: false });
            } else {
                this.setState({ requestWasSuccesful: true, requestResponse: parsedBody.message, sendButtonWasClicked: false });
            }
        }

        request(options, callback);
    }

    scrollToTop(duration, to = -window.scrollY) {
        if (duration <= 0) return;
        var difference = to - document.body.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop + perTick;
            if (document.body.scrollTop === to) return;
            this.scrollToBottom(duration - 10, to);
        }, 10);
    }

    scrollToBottom(duration, to = document.body.scrollHeight - (window.innerHeight + window.scrollY)) {
        if (duration <= 0) return;
        var perTick = to / duration * 10;

        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop + perTick;
            console.log(document.body.scrollTop);
            if (document.body.scrollTop === to) return;
            this.scrollToBottom(duration - 10, to);
        }, 10);
    }

    renderSendButton() {
        let className = (this.state.errors.length == 0 && this.state.sendButtonWasClicked) ? styles.disabled : '';
        let disabled = (this.state.errors.length == 0 && this.state.sendButtonWasClicked) ? true : false; 
        return <button disabled={disabled} className={className} onClick={(e) => this.onSendButtonClick(e)}>Send</button>
    }

    renderLoader() {
        if (this.state.errors.length == 0 && this.state.sendButtonWasClicked) { return <div className={styles.loader} /> }
    }

    renderRequestResponse() {
        let className = (this.state.requestWasSuccesful) ? '' : styles.error;
        if (this.state.requestResponse && ! this.state.sendButtonWasClicked) return <span className={className}>{this.state.requestResponse}</span>
    }

    render() {
        return (
            <div className={styles.contactForm}>
                <div className={styles.contactFormHeader}>
                    <div className={styles.contentWrapper}>
                        <h1>Contact</h1>
                        <h2>Thanks for visiting. &nbsp; I'll get back to you as soon as possible.</h2>
                    </div>
                </div>
                <div className={styles.contactFormBody}>
                    <form className={styles.contentWrapper}>
                        <div className={styles.formGroup}>
                            {this.renderFormControl('name', 'Name*')}
                            {this.renderFormControl('email', 'Email*')}
                        </div>
                        <div className={styles.formGroup + ' ' + styles.right}>
                            {this.renderFormControl('phone', 'Phone')}
                            {this.renderFormControl('companyName', 'Company Name')}
                        </div>
                        <div className={styles.formGroup + ' ' + styles.full}>
                            {this.renderFormControl('subject', 'Subject*')}
                            {this.renderFormControl('message', 'Message*', { formControlType: 'textarea' })}
                            {this.renderSendButton()}
                            {this.renderLoader()}
                            {this.renderRequestResponse()}
                            {this.renderErrors()}
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.state.errors.length > 0 && this.state.sendButtonWasClicked) {
            this.scrollToBottom(200);
            this.setState({ sendButtonWasClicked: false });
        }
    }

}

export default ContactForm;