import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
    state = {
        link: '',
    };

    onInputChange = (event) => {
        this.setState({ link: event.target.value });
        this.this.props.onSubmit(this.state.link);
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.link);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        type='text'
                        value={this.state.link}
                        onChange={this.onInputChange}
                        placeholder='Paste your playlist link here'
                    />
                </form>
            </div>
        );
    }
}

export default Search;
