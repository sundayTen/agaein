import React from 'react';
import FoundActive from 'assets/image/found_active.png';
import FoundInActive from 'assets/image/found_inactive.png';
import LostActive from 'assets/image/lost_active.png';
import LostInActive from 'assets/image/lost_inactive.png';
import { Step1Image } from './CreateArticle.style';

interface Step1ButtonProps {
    active: boolean;
    type: 'lost' | 'found';
}

const Step1ButtonImage = ({ active, type }: Step1ButtonProps) => {
    const getSrc = () => {
        if (type === 'lost') {
            return active ? LostActive : LostInActive;
        }
        return active ? FoundActive : FoundInActive;
    };
    return <Step1Image src={getSrc()} />;
};

export default Step1ButtonImage;
