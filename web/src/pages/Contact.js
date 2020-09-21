import React, {Component} from 'react';
import {Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import {sendContact} from "../utils/RestConnector";
import {Typography } from "antd";

const { Title, Paragraph} = Typography;

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
            email: ""
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    sendRequest = () => {
        const {title, content, email} = this.state
        sendContact(title, content, email).then( res =>{
            window.alert("Wysłano wiadomość.")
            this.setState({
                title: "",
                content: "",
                email: ""
            })
        })
    }

    render() {
        const {title, content, email} = this.state
        return (
            <div style={{ paddingRight: '10%', paddingLeft: '10%' }}>
                <Typography>
                    <Title>Masz pytania? Chętnie odpowiemy</Title>
                    <Paragraph>Napisz do nas!</Paragraph>
                <label>Tytuł:</label>
                <Input name="title" onChange={this.onChange} value={title}/>
                <br/>
                <br/>
                <label>Treść:</label>
                <TextArea name="content" onChange={this.onChange} value={content}/>
                <br/>
                <br/>
                <label>Email:</label>
                <Input name="email" onChange={this.onChange} value={email}/>
                <br/>
                <br/>
                <Button type="primary" style={{marginRight: '10px'}} onClick={this.sendRequest}>wyślij</Button>
                </Typography>
            </div>

        );
    }
}

export default Contact;
