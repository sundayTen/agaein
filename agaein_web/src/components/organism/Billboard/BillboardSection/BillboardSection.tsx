import { Font } from 'components/molecules';
import { BillboardSectionContainer, CountContainer, CountUnitContainer } from './BillboardSection.style';
type BillboardSectionType = 'animal' | 'search';

interface BillboardSectionProps {
    today: number;
    total: number;
    type: BillboardSectionType;
}

const BillboardSection = ({ today, total, type }: BillboardSectionProps) => {
    return (
        <BillboardSectionContainer>
            <Font
                label={type === 'animal' ? '등록된 동물 집계' : '검색한 횟수 집계'}
                fontType="h4"
                fontWeight="bold"
                style={{ whiteSpace: 'nowrap' }}
            />

            <CountUnitContainer>
                <CountUnit title="Today: " count={today} type={type} />
                <CountUnit title="Total: " count={total} type={type} />
            </CountUnitContainer>
        </BillboardSectionContainer>
    );
};

const CountUnit = ({ title, count, type }: { title: string; count: number; type: BillboardSectionType }) => {
    return (
        <CountContainer>
            <Font fontType="label" fontWeight="bold" label={title} htmlElement="span" />
            <Font
                fontType="h4"
                fontWeight="bold"
                status="ACTIVE"
                label={String(count)}
                htmlElement="span"
                style={{ color: type === 'search' ? 'green' : '#EFA03D' }}
            />
        </CountContainer>
    );
};

export default BillboardSection;
