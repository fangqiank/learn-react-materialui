import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'

const Select = (props) => {
    const {name,label,value,error=null,onChange,options} = props;
    return (
        <FormControl
          variant="outlined"
          {...(error && {error:true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem vlaue="">None</MenuItem>
                {
                    options.map((option,index)=>(<MenuItem key={index} value={option.id}>{option.title}</MenuItem>))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select
