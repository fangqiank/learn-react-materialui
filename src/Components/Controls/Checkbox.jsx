import React from 'react'
import { FormControl,FormControlLabel,Checkbox as MuiCheck } from '@material-ui/core';

const CheckBox = (props) => {
    const {name,label,value,onChange} =props;

    const convertToEventPara =(name,value)=>({
        target:{
            name,
            value
        }
    });

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheck
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}

export default CheckBox;
