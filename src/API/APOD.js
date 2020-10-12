import React from 'react';
import DatePicker from 'react-datepicker';
import { apiKey } from './../globals';

import "react-datepicker/dist/react-datepicker.css";

const api_url = 'https://api.nasa.gov/planetary/apod';

class APOD extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            uri: '',
            description: '',
            date: new Date(),
            resource_type: '',
            copyright: '',
            title: '',
        };
    }

    parseDate(){
        const date = this.state.date;
        return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    handleAPICall(){
        fetch(api_url + '?api_key=' + apiKey + '&date=' + this.parseDate())
        .then(response => response.json())
        .then(data => {
            this.setState({
                uri: data.url,
                description: data.explanation,
                resource_type: data.media_type,
                copyright: data.copyright,
                title: data.title,
            });
        });
    }

    handleDateChange(date){
        this.setState({
            date: date
        });
    }

    render(){
        const element = (this.state.resource_type === 'image') ? <img width="560" height="315" src={ this.state.uri } alt={ this.state.title } /> : <iframe width="560" height="315" src={ this.state.uri } frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={ this.state.title }></iframe>;
        
        return(
            <div style={{margin: 15 + "px"}}>
                <p>Get an astro resource from the NASA API!</p>
                <DatePicker selected={this.state.date} onChange={ date => this.handleDateChange(date) } maxDate={new Date()} />
                <button onClick={ () => this.handleAPICall() }>
                    Get resource
                </button>
                <p>{ this.state.description }</p>
                <div>
                    { element }
                    <div>
                        <small>
                            Copyright: { this.state.copyright }
                        </small>
                    </div>
                </div>
            </div>
        );
    }

}

export default APOD;