import React from 'react';

interface NoDataProps {
    title: string;
    message: string;
}

const NoData: React.FC<NoDataProps> = ({title, message}) => {
    return (
        <div className="flex items-center justify-center mt-12">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-700 mb-4">{title}</h1>
                <p className="text-xl text-gray-500">{message}</p>
            </div>
        </div>
    )
        ;
}

export default NoData;
