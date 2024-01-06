import React from 'react';
import './Footer.css';
import TrackVisibility from "../Utlis/TrackVisibility";

class Footer extends React.Component {

    state = {
        runAnimation: false
    };
    render() {
        const links = [
            {link: 'https://github.com/JonnyDeates/Koi-Timer', text: 'Github'},
            {link: 'https://jonnydeates.com', text: 'Jonny Deates'},
            {link: 'https://www.linkedin.com/in/jonnydeates/', text: 'Linked-in'}
        ]
        return (

                <div className={'footer-wrapper'} >
                    <div className='footer'>
                        {links.map((obj,i) => <a key={i} href={obj.link}>{obj.text} </a>)}
                    </div>
                    <p>© 2019 Jonny Deates. All rights reserved.</p>
                </div>

        );
    }
}

export default Footer;
