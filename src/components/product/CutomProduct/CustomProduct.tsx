import { useState } from 'react';

interface CustomProductProps {
    name: string;
    price: number;
    image?: string;
    isSoldOut?: boolean;
    onClick?: () => void;
}

export const CustomProduct = ({ name, price, isSoldOut, onClick }: CustomProductProps) => {
    return (
        <div
            className={`w-[16.5rem] p-4 gap-4 flex flex-col rounded-lg border border-neutral-300 ${isSoldOut ? 'opacity-50' : ''}`}
            onClick={isSoldOut ? undefined : onClick}
            style={{ cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
        >
            <div className="flex flex-col gap-2 h-full">
                <div className="font-medium text-lg">{name}</div>
                <div className="font-medium text-primary">{price}원</div>
                <div></div>
            </div>
        </div>
    );  
};

export default CustomProduct;
