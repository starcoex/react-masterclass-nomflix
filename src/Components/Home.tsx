import { info } from 'console'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getMovies, IGetMoviesResult } from '../api'
import { makeImagePath } from '../utils'
import { PathMatch, useMatch, useNavigate } from "react-router-dom"
const Container = styled.div`
background-color:black;
height: 200vh;
/* padding-bottom:200px; */

`
const Loader = styled.div`
height:20vh;
display:flex;
justify-content:center;
align-items:center;

`
const Banner = styled.div<{ bgColor: string }>`
display:flex;
height:100vh;
/* justify-content:flex-start;
align-items:center; */
flex-direction:column;
justify-content:center;
padding:60px;
background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${props => props.bgColor});
background-size:cover;

`
const Title = styled.h2`
font-size:68px;

`
const Overview = styled.p`
width:50%;
font-size:20px;
margin-top:20px;
/* position:relative; */
`
const Slider = styled.div`
top:-100px;
position:relative;
/* display:inline-block; */
`
const Row = styled(motion.div)`
display:grid;
grid-template-columns:repeat(6, 1fr);
/* grid-template-rows:repeat(3, 1fr); */
gap:10px;
margin-bottom:10px;
position:absolute;
width:100%;

`
const Box = styled(motion.div) <{ bgPhoto: string }>`
cursor: pointer;
/* position:relative; */
/* color:red; */
font-size:36px;
height:200px;
background-color:white;
background-image: url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
&:first-child{
  transform-origin:center left;
}
&:last-child{
  transform-origin:center right;
}
`
const Info = styled(motion.div)`
background-color: ${(props) => props.theme.black.lighter};
padding:8px;
width:100%;
opacity:0;
position:absolute;
bottom:0;
h4{
  text-align:center;
  font-size:12px;
}
`
const BigMovie = styled(motion.div)`
position:absolute;
left:0;
right:0;
width:50vw;
height:60vh;
background-color:red;
margin: 0 auto;
border:15px;
background-color:${props => props.theme.black.lighter};
`
const Overlay = styled(motion.div)`
position:fixed;
top:0;
width:100%;
height:100%;
/* background-color: blue; */
background-color: rgba(0, 0, 0, 0.5);
opacity:0;
`
const BigCover = styled.div`
width:100%;
height:400px;
background-size:cover;
background-position: center center;
`
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;`
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`
const rowVariants = {
  hidden: {
    x: window.innerWidth + 10
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.innerWidth - 10
  }
}
const boxVariants = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.5,
      type: "tween"
    }
  }
}
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    }
  },
}
const overlayVariants = {
  start: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}
const offset = 6;
export default function Home() {
  const navigate = useNavigate()
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId")
  const { scrollY } = useScroll()
  const setScrollY = useTransform(scrollY, value => value + 50)


  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies)
  // console.log(data, isLoading)
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  // const incraseIndex = () => setIndex((prev) = prev + 1)
  const clickMovie = bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id === Number(bigMovieMatch.params.movieId))
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving()
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
    }

  };
  const toggleLeaving = () => setLeaving((prev) => !prev)
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`)
  }
  const onOverlayClick = () => {
    navigate("/")
  }
  return (
    <Container>
      {isLoading ? <Loader>Loading...</Loader> :
        <>
          <Banner bgColor={makeImagePath(data?.results[0].poster_path || "")} onClick={incraseIndex}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 1 }}
                exit="exit" key={index}>
                {data?.results.slice(1).slice(offset * index, offset * index + offset).map((movie) => (
                  <Box
                    layoutId={movie.id + ""}
                    onClick={() => onBoxClicked(movie.id)}
                    whileHover="hover"
                    variants={boxVariants} initial="normal"
                    transition={{ type: "tween" }}
                    key={movie.id} bgPhoto={makeImagePath(movie.poster_path, "w500")} >
                    <Info variants={infoVariants} >
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ?
              <>
                <Overlay onClick={onOverlayClick} variants={overlayVariants} exit="exit" animate="start" />
                <BigMovie
                  style={{ top: setScrollY }}
                  // scrollY={setScrollY}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickMovie && <>
                    <BigCover style={{
                      backgroundImage: `url(${makeImagePath(clickMovie.backdrop_path, "w500")})`
                    }} />
                    <BigTitle>{clickMovie.title}</BigTitle>
                    <BigOverview>{clickMovie.overview}</BigOverview>
                  </>}
                </BigMovie>
              </>
              : null}

          </AnimatePresence>
        </>}
    </Container >
  )
}
