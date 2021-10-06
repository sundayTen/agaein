import React from 'react';
import { StyledFont } from './Font.style';

export type FontType = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label' | 'tag' | 'subhead';
export type FontWeight = 'bold' | 'normal';
export type FontStatus = 'ACTIVE' | 'DISABLED' | 'NORMAL';
interface FontProps extends React.ComponentPropsWithoutRef<'span'> {
    label: string;
    fontType: FontType;
    fontWeight?: FontWeight;
    status?: FontStatus;
    htmlElement?: 'p' | 'span' | undefined;
}

const Font = (props: FontProps) => {
    const { label, fontType = 'body', fontWeight = 'normal', htmlElement = 'p', status = 'NORMAL', ...others } = props;
    return (
        <StyledFont type={fontType} fontWeight={fontWeight} {...others} status={status} as={htmlElement}>
            {label}
        </StyledFont>
    );
};

export default Font;
