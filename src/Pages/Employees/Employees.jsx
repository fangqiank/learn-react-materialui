import React,{useState} from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../Components/PageHeader'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from '@material-ui/core';
import useTable from '../../Components/useTable';
import * as EmployeeService from '../../services/EmployeeService'; 
import Controls from '../../Components/Controls/Controls';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../Components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Components/Notification';
import ConfirmDialog from '../../Components/ConfirmDialog';

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },

    searchInput:{
        width:'80%'
    },

    newButton:{
        position:'absolute',
        right:'10px'
    }
}))

const headCells=[
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Address(Personal)'},
    {id:'mobile', label:'Cell Number'},
    {id:'department', label:'Department'},
    {id:'actions', label:'Operation' , disableSorting:true},
]

const Employees = () => {
    const classes = useStyles();
    const [records,setRecords] = useState(EmployeeService.getAllEmployees());
    const [filterFn,setFilterFn] = useState({fn:items=>{return items;}});
    const [openPopup,setOpenPopup] = useState(false);
    const [recordForEdit,setRecordForEdit] = useState(null);
    const [notify,setNotify] = useState({
        isOpen:false,
        message:'',
        type:''
    })
    const [confirmDialog,setConfirmDialog] = useState({
        isOpen:false,
        title:'',
        subTitle:''
    })

    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    }=useTable(records,headCells,filterFn);
    
    const handleSearch = e=>{
        let target = e.target;
        setFilterFn({
            fn:items=>{
                if(target.value == '')
                    return items;
                else
                    return items.filter(x=>x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee,resetForm)=>{
        if(employee.id == 0)
            EmployeeService.insertEmployee(employee);
        else
            EmployeeService.updateEmployee(employee)

        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(EmployeeService.getAllEmployees());
        setNotify({
            isOpen:true,
            message:'submitted successfully',
            type:'success'
        })
    }

    const openInPopup = item =>{
        setRecordForEdit(item)
        setOpenPopup(true);
    }

    const onDelete = id =>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
        EmployeeService.deleteEmployee(id);
        setRecords(EmployeeService.getAllEmployees());
        setNotify({
            isOpen:true,
            message:'deleted successfully',
            type:'warning'
        })
        
    }

    return (
        <>
            <PageHeader 
            title="New Employee"
            subTitle="Form design with validation"
            icon={ <PeopleOutlineIcon fontSize="large"/>}
            />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label="Search..."
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                      text="Add New"
                      variant = "outlined"
                      startIcon={<AddIcon />}
                      className={classes.newButton}
                      onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                    {
                      recordsAfterPagingAndSorting().map((item,index)=>(
                          <TableRow key={index}>
                              <TableCell>{item.fullName}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>{item.mobile}</TableCell>
                              <TableCell>{item.department}</TableCell>
                              <TableCell>
                                  <Controls.ActionButton 
                                    color="primary"
                                    onClick={()=>{openInPopup(item)}}
                                  >
                                        <EditOutlinedIcon fontSize="small" />
                                  </Controls.ActionButton>

                                  <Controls.ActionButton 
                                     color="secondary"
                                     onClick={()=>{
                                         setConfirmDialog({
                                             isOpen:true,
                                             title:'Are you sure to delete this record?',
                                             subTitle:'You can not undo this operation',
                                             onConfirm:()=>{onDelete(item.id)}
                                         })
                                     }}
                                  >
                                        <CloseIcon fontSize="small" />
                                  </Controls.ActionButton>
                              </TableCell>
                          </TableRow>
                      ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
          <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
              <EmployeeForm
                recordForEdit = {recordForEdit}
                addOrEdit={addOrEdit}
              />
          </Popup>
          <Notification
            notify={notify}
            setNotify = {setNotify}
          />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
    )
}

export default Employees
