import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// import Avatar from '@mui/material/Avatar';

function Home() {
  return (
      <Container fixed maxWidth="md" >
        <div style={{marginTop:60}}>
          <TextField id="url_textfield" label="URL 입력" style={{width: "55%", marginRight:7}}/>


          <Box>
            <Grid>
              <TextField id="standard-basic" label="개수" variant="standard" style={{width: "10%"}}/>
            </Grid>
            <Grid>
              <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="시간"
                  style={{width: "10%"}}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>

            <Grid>
              <Stack direction="row" spacing={1}>
                <Chip label="1080P" />
                <Chip label="720P" variant="outlined" />
                <Chip label="480P" variant="outlined" />
                <Chip label="360P" variant="outlined" />
              </Stack>
            </Grid>
            <Button variant="outlined">검색</Button>


          </Box>


        </div>

        <Typography variant="h5" align="center" color="text.secondary" marginTop="50px">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>

      </Container>
  );
}

export default Home;
