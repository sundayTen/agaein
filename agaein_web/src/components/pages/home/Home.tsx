import { RouteComponentProps } from 'react-router-dom';
import HomeHeader from 'components/organism/HomeHeader/HomeHeader';
import HomeArticleList from 'components/organism/HomeArticleList';
import { Board_Type } from 'graphql/generated/generated';
import { Fragment, useContext, useEffect, useMemo, useReducer } from 'react';
import { ModalContext } from 'contexts';

type STATE = {
    lfg_loading: boolean;
    lfp_loading: boolean;
    review_loading: boolean;
};

type ACTION =
    | { type: 'SET_LFG_LOADING'; lfg_loading: boolean }
    | { type: 'SET_LFP_LOADING'; lfp_loading: boolean }
    | { type: 'SET_REVIEW_LOADING'; review_loading: boolean };

const reducer = (state: STATE, action: ACTION) => {
    switch (action.type) {
        case 'SET_LFG_LOADING':
            return {
                ...state,
                lfg_loading: action.lfg_loading,
            };
        case 'SET_LFP_LOADING':
            return {
                ...state,
                lfp_loading: action.lfp_loading,
            };
        case 'SET_REVIEW_LOADING':
            return {
                ...state,
                review_loading: action.review_loading,
            };
    }
};

const initialValue: STATE = {
    lfg_loading: false,
    lfp_loading: false,
    review_loading: false,
};

const Home = (_: RouteComponentProps) => {
    const [loadingState, dispatch] = useReducer(reducer, initialValue);
    const { setLoading } = useContext(ModalContext);

    const setLfgLoading = (lfg_loading: boolean) => dispatch({ type: 'SET_LFG_LOADING', lfg_loading });
    const setLfpLoading = (lfp_loading: boolean) => dispatch({ type: 'SET_LFP_LOADING', lfp_loading });
    const setReviewLoading = (review_loading: boolean) => dispatch({ type: 'SET_REVIEW_LOADING', review_loading });

    const isLoadOn = useMemo(() => {
        return loadingState.lfg_loading || loadingState.lfp_loading || loadingState.review_loading;
    }, [loadingState.review_loading, loadingState.lfg_loading, loadingState.lfp_loading]);

    useEffect(() => {
        setLoading(isLoadOn);
    }, [isLoadOn]);

    return (
        <Fragment>
            <HomeHeader />
            <HomeArticleList boardType={Board_Type.Lfg} setLoading={setLfgLoading} />
            <HomeArticleList boardType={Board_Type.Lfp} setLoading={setLfpLoading} />
            <HomeArticleList boardType={Board_Type.Review} setLoading={setReviewLoading} />
        </Fragment>
    );
};

export default Home;
