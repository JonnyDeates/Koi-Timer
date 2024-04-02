import React from 'react';
import './Footer.css';

const Footer = () => {
    const links = [
        { link: 'https://github.com/JonnyDeates/Koi-Timer', text: 'Github' },
        { link: 'https://jonnydeates.com', text: 'Jonny Deates' },
        { link: 'https://www.linkedin.com/in/jonnydeates/', text: 'Linked-in' }
    ]

    const currentDateYear = new Date().getFullYear

    return (
        <div className={'footer-wrapper'} >
            <div className='footer'>
                {links.map((obj, i) => <a key={i} href={obj.link}>{obj.text} </a>)}
            </div>
            <p>© {currentDateYear} Jon Deates. All rights reserved.</p>
        </div>

    );
}

export default Footer;
