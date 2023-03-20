import React from 'react';
import ReactPlayer from 'react-player';
import {Grid} from "@mui/material";

const CandiPreview = ( ) => {
    return (
        <Grid container  justifyContent="center" spacing={1} height="30vh">
            <Grid item xs={10}>
                <ReactPlayer
                    style={{
                        margin: '0 auto',
                        maxWidth: '50%',
                        maxHeight: '70%',
                    }}
                    url="https://www.youtube.com/watch?v=WFsAon_TWPQ"
                    playing={true}
                    muted={true}
                    progress
                    controls
                    pip
                    config={{
                        youtube: { playerVars: { origin: 'https://www.youtube.com' } },
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default CandiPreview;
