import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {cardStateSlice} from "../store/card/cardSLice";
import {BackButton, Card, ContentList, DetailInfo, PageWrapper, Title} from "../components";
import {useAppDispatch} from "../store/store";
import {fetchCard} from "../store/card/asyncActions";
import {useLocation} from "react-router-dom";

export const CardPage = () => {
    const dispatch = useAppDispatch();
    const {card} = useSelector(cardStateSlice);
    const {pathname} = useLocation();
    const [owner, repo] = pathname.split(/[/_]/).slice(2);

    useEffect(() => {
        dispatch(fetchCard({
            owner: owner,
            repo: repo,
        }));
    }, [pathname]);

    return (
        <PageWrapper>
            <div className='w-full grid grid-cols-[15%_1fr_15%] justify-items-center'>
                <BackButton/>
                <Title title={card.name}/>
            </div>
            <DetailInfo title={'Детальная информация'}/>
            <ContentList>
                <Card/>
            </ContentList>
        </PageWrapper>
    );
};