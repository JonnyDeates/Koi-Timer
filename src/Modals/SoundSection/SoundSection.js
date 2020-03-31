import React, {Component} from 'react';

class SoundSection extends Component {

    state = {
        active: this.props.active,
        title: this.props.title,
        author: this.props.author,
        soundEffect: this.props.soundEffect,
        link: this.props.link,
        isOn: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.active !== prevProps.active) {
            this.setState({active: this.props.active});
        }

    }

    render() {
        return (
            <div className={(this.state.active) ? 'tinted sound-section' : 'sound-section'}>
                <audio ref="test_Audio">
                    <source src={this.state.soundEffect}/>
                </audio>
                <div className={''}>
                    <h3>{this.state.title}</h3>
                    <p onClick={()=> window.open(this.state.link)}>{this.state.author}</p>
                </div>
                <div>
                    {(this.state.isOn)
                        ? <button onClick={() => this.setState({isOn: false}, function () {
                            this.refs.test_Audio.pause();
                        })}>Stop</button>
                        : <button onClick={() => this.setState({
                            soundEffect: this.state.soundEffect,
                            isOn: true
                        }, function () {
                            this.refs.test_Audio.volume = this.props.volume;
                            this.refs.test_Audio.pause();
                            this.refs.test_Audio.load();
                            this.refs.test_Audio.play();
                        })}>Play</button>}
                        <button onClick={()=> this.props.setSound({title: this.state.title,
                            author: this.state.author,
                            soundEffect: this.state.soundEffect,
                            link: this.state.link})}>Set</button>
                </div>
            </div>
        );
    }

}


export default SoundSection;
