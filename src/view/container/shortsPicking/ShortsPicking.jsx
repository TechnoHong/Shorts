import React from 'react';
import {
    Container, Divider,
    styled
} from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {ContentsWrapper} from "../../components/ContentsWrapper";
import MainDescription from "../home/MainDescription";
import StepDescription from "../home/StepDescription";
import TextField from "@mui/material/TextField";
import RangeSlider from "../home/RangeSlider";
import RangeButtonGroup from "../home/RangeButtonGroup";
import {Send} from "@mui/icons-material";

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
                    <Button variant="outlined" color="error" >
                        re-pick
                    </Button>
                    <Button variant="contained" color="success">
                        Download
                    </Button>
                    <StepDescription step="1." description={t('main.stepDescription1')} />
                    <TextField
                        id="url-text-field"
                        placeholder={t('main.searchLabel')}
                        variant="outlined"
                        sx={{ minWidth: '50%' }}
                    />
                    <Divider flexItem />
                    <StepDescription step="2." description={t('main.stepDescription2')} />
                    <RangeSlider />
                    <RangeButtonGroup />
                    <Divider flexItem />
                    <StepDescription step="3." description={t('main.stepDescription3')} />
                    <Button
                        disableElevation
                        variant="contained"
                        sx={{ fontSize: '1.5rem', textTransform: 'none' }}
                        endIcon={<Send />}
                    >
                        Picking
                    </Button>
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