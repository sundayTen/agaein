import React from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error | boolean) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: false, error });
        console.log({ error, errorInfo });
    }

    reset() {
        this.setState({ hasError: false });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <Title>예상치 못한 에러가 발생했습니다</Title>
                    <Description>{this.state.error}</Description>
                    <GoHomeButton type="button" onClick={this.reset}>
                        홈으로 가기
                    </GoHomeButton>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

const ErrorContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Title = styled.h2``;
const Description = styled.p``;

const GoHomeButton = styled.button``;
