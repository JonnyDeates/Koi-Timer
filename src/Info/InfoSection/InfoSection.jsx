import React from 'react';

class InfoSection extends React.Component {

    state = {
        title: this.props.title,
        body: this.props.body,
        list: (this.props.list) ? this.props.list : null,
        style: this.props.style
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.title !== prevProps.title) {
            this.setState({
                title: this.props.title,
                body: this.props.body,
                list: (this.props.list) ? this.props.list : null,
                style: this.props.style
            });
        }
    }


    render() {

        const body = () => {
            if (this.state.body !== "ol" && this.state.body !== 'ul') {
                return <p>{this.state.body}</p>
            } else if (this.state.body === 'ol') {
                return <ol>{this.state.list.map((obj,i) => <li key={i}>{obj}</li>)}</ol>
            } else {
                return <ul>{this.state.list.map((obj,i) => <li key={i}>{obj}</li>)}</ul>
            }
        };
        return (
            <div className={this.state.style}>
                <h3>{this.state.title}</h3>
                {body()}
            </div>
        );
    }

}


export default InfoSection;
