import React from 'react';
import {
    Container,
    styled
} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {ContentsWrapper} from "../../components/ContentsWrapper";
import MainDescription from "../home/MainDescription";
import StepDescription from "../home/StepDescription";
import ShortsButtonGrp from "./ShortsButtonGrp";
import PickingCandi from "./PickingCandi";

function ShortsPicking() {
    const { t } = useTranslation(['page']);
    return (
        <ContentsWrapper
            disableGutters
            maxWidth={false}
            sx={{ padding: '0 0 1.5rem' }}
        >

            <MainContainer disableGutters maxWidth={false}>
                <MainDescription description={t('picking.mainDescription')} />
                <SearchContainer
                    disableGutters
                    sx={{ borderRadius: { md: 'none', lg: '30px 30px 30px 30px' } }}
                >

                    <ShortsButtonGrp flexItem />
                    <PickingCandi />
                    <StepDescription step="1." description={t('main.stepDescription1')} />
                    <StepDescription step="2." description={t('main.stepDescription2')} />
                    <StepDescription step="3." description={t('main.stepDescription3')} />
                </SearchContainer>
            </MainContainer>

            <Typography
                variant="h7"
                sy={{ p: 3 }}
                align="center"
                color="text.secondary"
                marginTop="10px"
            >
                Something short and leading about the collection below—its contents, the
                creator, etc. Make it short and sweet, but not too short so folks
                don&apos;t simply skip over it entirely.
            </Typography>
        </ContentsWrapper>
    );
}
const SearchContainer = styled(Container)(({ theme }) => ({
    ...theme.components.MuiContainer,
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    alignItems: 'center',
    gap: '2rem',
    background: theme.palette.background.homeSearchContainer,
}));

const MainContainer = styled(Container)(({ theme }) => ({
    ...theme.components.MuiContainer,
    background: theme.palette.background.homeMainContainer,
}));
export default ShortsPicking;