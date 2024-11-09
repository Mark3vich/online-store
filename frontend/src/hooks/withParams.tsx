import React from 'react';
import { useParams } from 'react-router-dom';

function withParams(Component: React.ComponentType<any>) {
    return (props: any) => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

export default withParams;
