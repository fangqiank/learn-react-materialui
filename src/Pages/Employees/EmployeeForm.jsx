import { Grid } from '@material-ui/core';
import React,{useEffect} from 'react'
import {useForm,Form} from '../../Components/useForm';
import Controls from '../../Components/Controls/Controls';
import * as employeeService from '../../services/EmployeeService'
import { ErrorSharp } from '@material-ui/icons';

const initialValues= {
    id:0,
    fullName:'',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departmentId:'',
    hireDate: new Date(),
    isPermanent:true
}

const genderItems = [
    {id:'male',title:'男'},
    {id:'female',title:'女'},
    {id:'other',title:'其他'}
]



const EmployeeForm = (props) => {
    const {addOrEdit,recordForEdit} = props;
    const validate=(fieldValues = values)=>{
        let temp ={...errors}
        if('fullName' in fieldValues)
            temp.fullName =values.fullName?"":"This field is required"
    
        if('email' in fieldValues)
            temp.email =(/$^|.+@.+..+/).test(values.email)?"":"Email is not valid"
    
        if('mobile' in fieldValues)
            temp.mobile =values.mobile.length > 10?"":"Minimum 11 numbers required"
    
        if('departmentId' in fieldValues)
            temp.departmentId =values.departmentId.length!=0?"":"This field is required"
    
        setErrors({
            ...temp
        })
        
        if(fieldValues==values)
            return Object.values(temp).every(x=>x=="");
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }=useForm(initialValues,true,validate);

    const handleSubmit = e=>{
        e.preventDefault();
        if(validate()){
            addOrEdit(values, resetForm);
        }
    }

    useEffect(()=>{
        if(recordForEdit !== null)
          setValues({
              ...recordForEdit
          })
    },[recordForEdit])

    return (
    <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs ={6}>
                <Controls.Input
                name="fullName"
                lable ="Full Name"
                value = {values.fullName}
                onChange = {handleInputChange} 
                error={errors.fullName}
                />

                <Controls.Input
                name="email"
                lable ="Email"
                value = {values.email}
                onChange = {handleInputChange} 
                error={errors.email}
                />

                <Controls.Input
                name="mobile"
                lable ="Mobile"
                value = {values.mobile}
                onChange = {handleInputChange} 
                error={errors.mobile}
                />

                <Controls.Input
                name="city"
                lable ="City"
                value = {values.city}
                onChange = {handleInputChange} 
                />


            </Grid>

            <Grid item xs ={6}>
                <Controls.RadioGroup
                    name='gender'
                    label="Gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderItems}
                />

                <Controls.Select
                  name="departmentId"
                  label="Department"
                  value={values.departmentId}
                  onChange={handleInputChange}
                  options={employeeService.getDepartmentCollection()}
                  error={errors.departmentId}
                />

                <Controls.DatePicker
                  name="hireDate"
                  label ="Hire Date"
                  value={values.hireDate}
                  onChange={handleInputChange}
                />

                <Controls.Checkbox
                  name="isPermanent"
                  label="Is Permanent employee?"
                  value={values.isPermanent}
                  onChange={handleInputChange}
                />
                
                <div>
                    <Controls.Button
                      type='submit'
                      text="Submit"
                    />

                    <Controls.Button
                      text="Reset"
                      color='default'
                      onClick={resetForm}
                    />
                </div>
            </Grid>
        </Grid>
    </Form>
    
    )
}

export default EmployeeForm
