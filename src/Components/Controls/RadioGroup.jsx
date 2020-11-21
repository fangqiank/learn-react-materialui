import React from 'react'
import { FormControl, RadioGroup as MuiRadioGroup, FormLabel,Radio,FormControlLabel } from '@material-ui/core';

const RadioGroup = (props) => {

    const {name,lable,value,onChange,items} = props;
    return (
        <FormControl>
            <FormLabel>{lable}</FormLabel>
            <MuiRadioGroup row
            name={name}
            value={value}
            onChange={onChange} 
            >
            {
                items.map((item,index)=>(
                    <FormControlLabel key={index} value={item.id} control={<Radio/>} label={item.title}/>
                ))
            }
            </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup
