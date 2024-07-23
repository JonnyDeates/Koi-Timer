import React from 'react';
import Helmet from 'react-helmet';
type TitleComponentProps = {title: string}
const TitleComponent = ({ title }: TitleComponentProps) => {
    let defaultTitle = 'Koi Timer';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export { TitleComponent };