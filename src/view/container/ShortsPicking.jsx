import React from 'react';
import {
    Avatar, Checkbox,
    Container, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    styled
} from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


const ShortsPicking = () => {
    const [dense] = React.useState(false);
    const [secondary] = React.useState(false);

    return (
        <React.Fragment>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Just PICK your shorts up !
                </Typography>
                <Typography variant="h7" align="center" color="text.secondary" component="p">
                    Pick the timestamp what you wanna get shorts. You can also see preview
                    just touching &apos;PREVIEW&apos; button. Look around freely.
                </Typography>
            </Container>
            <Container maxWidth="sm" sx={{ pt: 2 }} >
                <Button variant="outlined" color="error">
                    re-pick
                </Button>
                <Button variant="contained" color="success">
                    Download
                </Button>

            </Container>
            <Container maxWidth="sm" sx={{ pt: 2, pb: 2 }} >
                <Demo>
                    <List dense={dense}>
                        <ListItem>
                            <Checkbox defaultChecked />
                            <ListItemText
                                primary="[1] [timestamp] 10:55"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Checkbox />
                            <ListItemText
                                primary="[2] [timestamp] 08:20"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Checkbox defaultChecked />
                            <ListItemText
                                primary="[3] [timestamp] 08:20"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                    </List>
                </Demo>
            </Container>
        <Container maxWidth="sm">
            <Stack spacing={10}>
            </Stack>
        </Container>
        </React.Fragment>
    );
};

export default ShortsPicking;
