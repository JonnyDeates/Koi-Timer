import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title }) => {
    let defaultTitle = 'Koi Timer';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export { TitleComponent };