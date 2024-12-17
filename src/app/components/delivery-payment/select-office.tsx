import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';


export default function SelectOffice() {
    const [office, setOffice] = useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        setOffice(event.target.value as string);
    };

    return (
        <div className='ml-4'>
            <FormControl size="small">
                <InputLabel id="demo-simple-select-label" size="small"
                    sx={{
                        "&.Mui-focused": {
                            color: 'white'
                        }
                    }}>
                    Office
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={office}
                    label="Office"
                    onChange={handleChange}
                    sx={{
                        width: 200,
                        height: 40
                    }}
                >
                    <MenuItem value={"office location 1"}> Office location 1 </MenuItem>
                    <MenuItem value={"office location 2"}> Office location 2 </MenuItem>
                    <MenuItem value={"office location 3"}> Office location 3 </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}