import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core';
import { ErrorSharp } from '@material-ui/icons';

export const useForm = (initialValues,validateOnChange=false,validate) => {

    const [values,setValues] = useState(initialValues);
    const[errors,setErrors]=useState({});

    const handleInputChange = e =>{
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
        if(validateOnChange)
            validate({
                [name]:value
            })
    }

    const resetForm=()=>{
        setValues(initialValues);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const useStyles = makeStyles(theme=>({
    root:{
       '& .MuiFormControl-root':{
            margin:theme.spacing(1),
            width:'80%'
       } 
    }
}))

export const Form = (props)=>{
    const classes = useStyles();
    const {children,...other}=props;
    return (
       <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
       </form>
    )
}
