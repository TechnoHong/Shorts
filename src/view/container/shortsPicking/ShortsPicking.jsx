import React from 'react';
import {
    Container, Divider, Stack,
    styled
} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {ContentsWrapper} from "../../components/ContentsWrapper";
import MainDescription from "../home/MainDescription";
import PickingCandi from "./PickingCandi";
import Button from "@mui/material/Button";
import CandiPreview from "./CandiPrivew";

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
                    <CandiPreview />
                    <Divider flexItem />
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        justifyContent="flex-end"
                        spacing={2} >
                        <Button variant="contained" color="success">Download</Button>
                        <Button variant="outlined" color="error" >re-pick</Button>
                    </Stack>
                    <PickingCandi description={t('picking.candiBrief')}/>
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