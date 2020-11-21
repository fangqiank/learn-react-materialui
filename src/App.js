import './App.css';
import SideMenu from './Components/SideMenu'
import Header from "./Components/Header"

import Employees from './Pages/Employees/Employees';
import { createMuiTheme, CssBaseline, makeStyles,ThemeProvider} from '@material-ui/core';

const useStyles = makeStyles({
  appMain:{
    paddingLeft:'320px',
    width:'100%'
  }
})

const theme = createMuiTheme({
  palette:{
    primary:{
      main:'#333996',
      light:'#3c44b126'
    },
    secondary:{
      main:"#f83245",
      light:"#f8324526"
    },
    background:{
      default:'#f4f5fd'
    }
  },

  shape:{
    borderRadius:'12px'
  },

  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },

  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

function App() {
  const classes =useStyles();
  return (
   <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header/>
        <Employees/>
      </div>
      <CssBaseline/>
   </ThemeProvider>
  );
}

export default App;
