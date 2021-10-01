import StepIndicator from 'components/molecules/StepIndicator';

const Step3 = () => {
    return (
        <div>
            <StepIndicator active={3} styles={{ marginTop: 100 }} />
            <h1>등록이 완료됐습니다!</h1>
        </div>
    );
};

export default Step3;
