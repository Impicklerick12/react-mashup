import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import { Container, Box, CssBaseline, Typography, Button } from '@material-ui/core';
import ProductInput from './ProductInput';
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function FilterableProductTable( { products } ) {

  const [filterText, setFilterText] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  // const [light, setLight] = useState(true);

  // const themeLight = createMuiTheme({
  //   palette: {
  //     background: {
  //       default: "#ffffff"
  //     }
  //   }
  // });
  
  // const themeDark = createMuiTheme({
  //   palette: {
  //     background: {
  //       default: "#222222"
  //     },
  //     text: {
  //       primary: "#ffffff"
  //     }
  //   }
  // });

  return (

    <React.Fragment>
      {/* <MuiThemeProvider theme={themeDark}> */}
        <CssBaseline />
        {/* <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button> */}

        <Container maxWidth="sm">
          <Box mt="5%"><Typography variant="h3" align="center">Products</Typography></Box>
          
          <Box m="2rem">
            <SearchBar 
              filterText={filterText} 
              inStockOnly={inStockOnly} 
              onFilterTextChange={text => setFilterText(text)}
              onInStockChange={stock => setInStockOnly(stock)}
            />
            <ProductTable 
              products={products} 
              filterText={filterText} 
              inStockOnly={inStockOnly} 
            />
          </Box>

          <Box>
            <ProductInput />
          </Box>
        </Container>
      {/* </MuiThemeProvider> */}


    </React.Fragment>

  );
}

export default FilterableProductTable;

