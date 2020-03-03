import React from 'react';
import PrintList from "./containers/prints/list"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <PrintList />
      </div>
    </ThemeProvider>
  );
}

export default App;
