import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getMovies, IGetMoviesResult } from '../api'
const Container = styled.div`
background-color:black;
height: 200vh;
`
export default function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies)
  // console.log(data, isLoading)
  return (
    <Container>
      <ul>
        {data?.results.map((movie) => <li key={movie.id}>{movie.overview}</li>)}
      </ul>
    </Container>
  )
}
