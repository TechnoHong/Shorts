import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PickingCandi() {
    const [state, setState] = React.useState({
        shorts1: true,
        shorts2: false,
        shorts3: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { shorts1, shorts2, shorts3 } = state;

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 5 }} component="fieldset" variant="standard">
                <FormLabel component="legend">picking.candiBrief</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={shorts1} onChange={handleChange} name="gilad" />
                        }
                        label="shorts1"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={shorts2} onChange={handleChange} name="jason" />
                        }
                        label="shorts2"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={shorts3} onChange={handleChange} name="antoine" />
                        }
                        label="shorts3"
                    />
                </FormGroup>
            </FormControl>
        </Box>
    );
}
