import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import PokemonShow from './PokemonShow';
// a module used to make asynchronous requests to APIs
// works similarly to fetch
import axios from 'axios'
import { Container, Box, Typography } from '@material-ui/core';



function Pokedex() {

  // pokemon is the current state, setPokemon is to update the state
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [summaryPokemon, setSummaryPokemon] = useState(null)

  // this is a hook that takes a function
  // it runs every single time based on the props that we pass
  useEffect(() => {
    // every time we make a request, set loading state to be true
    setLoading(true)
    let cancel
    // axios can take a 2nd parameter as an object
    // every time axios makes a call, it will set the cancelToken into cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      // when the request is fetched, then set loading state to false
      setLoading(false)
      // this data being passed in from the promise is in the object returned from the API
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      // when the result comes through from the promise, map over the array of objects to get the name
      setPokemon(res.data.results)
    })

    // useEffect allows us to return a function which gets called every time useEffect gets called again
    // allows us to cancel previous request every time a new request comes through
    return () => cancel()

    // we pass an array of arguments
    // every time the elements in the array change, it will rerun the effect
    // if we leave it empty, it will only run one single time
    // but putting currentPageUrl in there, if the contents have changed in that url, then re-run the effect
  }, [currentPageUrl])



  function changeSummaryPokemon(url) {
    setLoading(true)
    axios.get(url).then(res => {
      let pokemon = res.data
      // when the request is fetched, then set loading state to false
      setLoading(false)
      setSummaryPokemon({name: pokemon.name, id: pokemon.id, type1: (pokemon.types[0] == undefined ? "None" : pokemon.types[0].type.name), type2: (pokemon.types[1] == undefined ? "None" : pokemon.types[1].type.name)})
    })
  }

  //Pagination component uses these
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }


  if (loading) return "Loading..."


  return (
    <Container>
      <Box mt="1%"><Typography variant="h3" align="center">Pokedex</Typography></Box>

      { summaryPokemon == null 
        ? 
          <>
            <PokemonList 
              pokemon = { pokemon } 
              changeSummaryPokemon = { changeSummaryPokemon } 
            />
            <Container className="d-flex justify-content-center">
              <Pagination
                goToNextPage = { nextPageUrl ? goToNextPage : null }
                goToPrevPage = { prevPageUrl ? goToPrevPage : null }
              />
            </Container>
          </>
        : 
          <PokemonShow 
            summaryPokemon = { summaryPokemon } 
            setSummaryPokemon = { setSummaryPokemon } 
          />
      }
      

    </Container>
  );

}

export default Pokedex;
