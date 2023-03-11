import { motion, useAnimation, useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import styled from 'styled-components'
import "../Styles/Starcoexsvg.css"
import Account from './Account'
const Nav = styled(motion.nav)`
display:flex;
justify-content:space-between;
align-items:center;
position:fixed;
top:0;
background-color:black;
width:100%;
font-size:14px;
padding:15px 60px;
color:white;
box-sizing:border-box;
`
const Col = styled.div`
display:flex;
align-items:center;
/* width:100%; */
`
const Logo = styled(motion.svg)`
margin-right:50px;
width:95px;
height:25px;
/* fill:${props => props.theme.red}; */
/* path{
  stroke-width:1px;
  stroke:white;
}  */
`
const Items = styled.ul`
    align-items: center;
    display: flex;


`
const Item = styled(motion.li)`
margin-right:20px;
position:relative;
display:flex;
justify-content:center;
flex-direction:column;
margin-right:10px;
color:${props => props.theme.white.darker};
transition: color 0.3s ease-in-out;
font-size:12px;

&:horver{
  color:${props => props.theme.white.lighter};
}
`
const Search = styled.span`
position:relative;
color:white;
display:flex;

/* justify-content:space-between; */
align-items:center;
    /* align-items: center;
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
    position: absolute;
    right: 4%;
    top: 0; */
svg{
  height:25px;
}
`
const Circle = styled(motion.span)`
width:5px;
height:5px;
border-radius:5px;
background-color:${props => props.theme.red};
position:absolute;
bottom:-5px;
left:0;
right:0;
margin: 0 auto;
`


const Notify = styled.span`
color:white;
svg{
  height:25px;
}
`
const Input = styled(motion.input)`
transform-origin: right center;
position:absolute;
/* left:-180px; */
right:65px;
z-index:-1;
background-color:transparent;
color:white;
border:1px solid ${props => props.theme.white.lighter};
/* border-radius:5px; */
padding-left:40px;
padding:5px 10px;
font-size:16px;
&::placeholder{
  text-align:center;
  color:white;
  font-size: 12px
  
}
/* padding: 0 10px;
margin: 0 10px; */
`

// const logoVariants = {
//   initial: {
//     pathLength: 0,
//   },
//   visible: {
//     pathLength: 3,
//     transition: {
//       duration: 5
//     }
//   }
// }
const logoVariants = {
  initail: {
    fillOpacity: 1,
  },
  visible: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const homeMath = useMatch("/")
  const seriesMath = useMatch("/series")
  const moviesMath = useMatch("/movies")
  const latestMath = useMatch("/latest")
  const myListMath = useMatch("/my-list")
  const originalAudioMath = useMatch("/original-audio")
  const inputAnimation = useAnimation()
  const navAnimation = useAnimation()
  const { scrollY } = useScroll()

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,1)"
        })
      } else {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,0)"
        });
      }
    })
  }, [scrollY, navAnimation])
  // useEffect(() => {
  //   scrollY.onChange(() => {
  //     console.log(scrollY)
  //     if (scrollY.get() > 80) {
  //       navAnimation.start("scroll");
  //     } else {
  //       navAnimation.start("top");
  //     }
  //   });
  // }, [scrollY, navAnimation]);

  const toggleSearch = () => {

    // setSearchOpen(true)
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      })
    } else {
      inputAnimation.start({
        scaleX: 1
      })
    }
    setSearchOpen((prev) => !prev)
  }
  return (
    <Nav initial={{ backgroundColor: "rgba(0,0,0,1)" }} animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="visible"
          initial="initail"
          // animate="visible"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 297.17 61.7" >
          <motion.path className="cls-6" d="M32.56,29.93c-1.69-1.17-3.64-2.09-5.8-2.75-2.09-.64-4.24-1.23-6.41-1.76-1.58-.38-3.12-.8-4.58-1.23-1.4-.42-2.65-.97-3.7-1.62-1.01-.62-1.82-1.42-2.41-2.38-.58-.93-.87-2.15-.87-3.62,0-1.36,.23-2.6,.69-3.7,.44-1.07,1.14-2,2.05-2.76,.93-.77,2.14-1.38,3.58-1.8,1.47-.43,3.24-.65,5.25-.65,2.72,.03,5.31,.34,7.69,.93,2.4,.6,4.76,1.38,7.01,2.33l1.13,.48V3.36l-.49-.21c-2.17-.93-4.59-1.69-7.19-2.27-2.61-.58-5.46-.87-8.47-.87-2.66,0-5.21,.33-7.58,.98-2.39,.66-4.54,1.7-6.37,3.09-1.86,1.4-3.35,3.2-4.43,5.33-1.09,2.14-1.64,4.72-1.64,7.67s.53,5.24,1.58,7.09c1.04,1.85,2.44,3.38,4.16,4.55,1.68,1.15,3.62,2.06,5.75,2.71,2.07,.63,4.22,1.2,6.39,1.7,1.61,.38,3.17,.8,4.63,1.24,1.41,.42,2.66,.97,3.73,1.63,1.02,.64,1.85,1.45,2.46,2.42,.59,.95,.9,2.18,.9,3.68,0,1.87-.36,3.43-1.06,4.65-.7,1.21-1.66,2.18-2.86,2.88-1.24,.73-2.71,1.25-4.37,1.57-2.74,.51-5.63,.67-9.12,.24-1.32-.16-2.65-.39-3.96-.68-1.3-.28-2.57-.63-3.78-1.04-1.2-.4-2.3-.85-3.26-1.33l-1.18-.59v7.97l.39,.24c.69,.42,1.6,.83,2.77,1.24,1.13,.4,2.41,.76,3.81,1.07,1.39,.31,2.87,.56,4.41,.74,1.54,.18,3.07,.28,4.52,.28,3.18,0,6.16-.34,8.84-1,2.72-.67,5.11-1.72,7.11-3.12,2.03-1.41,3.64-3.24,4.79-5.45,1.15-2.2,1.73-4.84,1.73-7.84s-.54-5.42-1.62-7.34c-1.07-1.9-2.48-3.47-4.21-4.66Z" />
          <motion.path className="cls-6" d="M62.52,51.89c-2.2,.32-4.17,.26-5.53-.23-.77-.28-1.4-.66-1.88-1.14-.48-.47-.83-1.05-1.05-1.7-.23-.68-.35-1.45-.35-2.27V24.33h11.81v-7.16h-11.81V6.36h-8.08v10.81h-7.61v7.16h7.61v23.21c0,1.75,.27,3.37,.8,4.81,.54,1.47,1.37,2.75,2.47,3.78,1.09,1.03,2.47,1.84,4.1,2.38,1.6,.54,3.51,.81,5.66,.81h.01c1.61-.03,3.02-.14,4.2-.35,1.2-.2,2.09-.42,2.7-.67l.51-.21v-7.03l-1.03,.29c-.77,.21-1.62,.39-2.54,.52Z" />
          <motion.path className="cls-6" d="M98.55,24.33c-1.18-2.47-3.13-4.48-5.81-5.97-2.65-1.48-6.08-2.22-10.19-2.22-1.12,0-2.27,.06-3.41,.17-1.13,.11-2.23,.28-3.25,.49-1.02,.21-2.01,.47-2.93,.77-.93,.3-1.76,.63-2.46,.98l-.45,.22v7.1l1.11-.42c1.7-.65,3.43-1.16,5.13-1.52,1.7-.36,3.54-.54,5.46-.54,2.54,0,4.55,.41,6.01,1.21,1.43,.79,2.49,1.79,3.12,2.97,.29,.56,.5,1.22,.63,1.96,.13,.79,.2,1.7,.2,2.74v1.65c-1.16-.37-2.46-.7-3.85-.96-1.79-.34-3.75-.53-5.85-.55-2.24,0-4.32,.3-6.18,.91-1.88,.61-3.52,1.51-4.87,2.65-1.36,1.15-2.43,2.58-3.19,4.23-.75,1.65-1.13,3.54-1.13,5.62s.34,4,1.02,5.67c.68,1.68,1.64,3.13,2.88,4.3,1.23,1.17,2.71,2.07,4.41,2.67,1.68,.6,3.54,.9,5.53,.9,1.47,0,2.88-.16,4.18-.48,1.3-.32,2.51-.75,3.62-1.29,1.1-.54,2.09-1.16,2.94-1.85,.39-.32,.75-.64,1.09-.96l.57,3.54h6.92V31.12c0-1.32-.09-2.54-.28-3.65-.19-1.14-.52-2.19-.96-3.15Zm-6.83,16.44v6.93c-.28,.27-.66,.61-1.14,1.02-.61,.52-1.37,1.05-2.25,1.58-.87,.52-1.88,.98-3.01,1.36-1.92,.65-4.33,.78-6.3,.16-.81-.26-1.52-.65-2.1-1.17-.58-.51-1.05-1.17-1.38-1.97-.34-.81-.52-1.78-.52-2.88,0-2.16,.65-3.7,1.99-4.71,1.39-1.05,3.38-1.58,5.92-1.58,1.9,.03,3.66,.19,5.23,.49,1.34,.25,2.53,.52,3.56,.78Z" />
          <motion.path className="cls-6" d="M128.94,16.22c-.24-.03-.51-.05-.83-.07-1.97-.09-3.76,.11-5.46,.57-1.45,.39-2.8,.94-4.02,1.64-1.22,.7-2.33,1.52-3.3,2.45-.53,.5-1.01,1.03-1.45,1.58l-1.04-5.21h-6.48V58.3h8.08V30.19c.62-.97,1.39-1.83,2.29-2.55,.98-.79,2.09-1.45,3.31-1.99,1.22-.54,2.56-.95,3.96-1.22,1.41-.26,2.87-.4,4.34-.4h1.32v-7.74l-.72-.09Z" />
          <motion.polygon className="cls-6" points="238.92 17.16 248.04 17.16 281.44 58.16 272.33 58.16 238.92 17.16" />
          <motion.path className="cls-6" d="M226.31,59.21c-14.63,0-22.46-10.6-22.46-21.6,0-11.71,8.38-21.52,21.28-21.52s21.59,9.73,21.59,24.29h-35.28c1.11,7.03,6.8,12.18,14.79,12.18,0,0,11.68,1.36,20.75-7.71l22.57-27.69h9.11l-26.21,32.17c-11.87,11.87-26.13,9.88-26.13,9.88Zm12.34-24.68c-.71-6.8-6.25-11.79-13.6-11.79-8.7,0-12.9,6.17-13.61,11.79h27.21Z" />
          <motion.path className="cls-6" d="M187.94,16.1c12.98,0,22.31,9.97,22.31,21.6s-8.86,21.52-22.31,21.52-22.31-9.73-22.31-21.52,9.33-21.6,22.31-21.6Zm-14.71,21.6c0,7.91,6.8,14.87,14.71,14.87s14.72-6.96,14.72-14.87c0-8.55-6.8-14.95-14.72-14.95s-14.71,6.41-14.71,14.95Z" />
          <motion.path className="cls-2" d="M151.06,58.53s-20.6-4.93-16.51-16.41c0,0,4.41-13.05,19.92-12.85,0,0,6.29-.42,10.48,3.36,0,0-2.1-11.08-13.94-15.15,0,0,2.62,2.2-.84,2.36,0,0-13.73-.63-21.38,3.98,0,0-4.31,2.56-6.4,10.27-.5,1.84-.49,5.54-.05,7.91,0,0,1.84,13.84,16.83,17.25,0,0,6.5,1.47,11.9-.73Z" />
          <motion.path className="cls-2" d="M151.06,58.53s-20.6-4.93-16.51-16.41c0,0,4.41-13.05,19.92-12.85,0,0,6.29-.42,10.48,3.36,0,0-2.1-11.08-13.94-15.15,0,0,2.62,2.2-.84,2.36,0,0-13.73-.63-21.38,3.98,0,0-4.31,2.56-6.4,10.27-.5,1.84-.49,5.54-.05,7.91,0,0,1.84,13.84,16.83,17.25,0,0,6.5,1.47,11.9-.73Z" />
          <motion.path className="cls-1" d="M148.77,57.87c.26-.29,.36-.49,.36-.49,1.31-2.31-14.26-9.33-14.26-9.33-.11-.06-.21-.12-.32-.17,2.14,5.49,10.21,8.7,14.22,9.99Z" />
          <motion.path className="cls-1" d="M150.17,19.85c2.2-.1,1.94-1.03,1.46-1.69-5.17-1.38-8.85,.35-11.08,2.15,5.21-.66,9.62-.46,9.62-.46Z" />
          <motion.path className="cls-7" d="M150.17,19.85s-4.41-.2-9.62,.46c-1.77,1.42-2.64,2.89-2.64,2.89-3.87,5.6-1.88,10.44,.08,13.22,2.95-3.48,8.09-7.25,16.49-7.14,0,0,6.29-.42,10.48,3.36,0,0-1.46-7.67-8.77-12.59-1.63-.9-3.15-1.51-4.55-1.89,.48,.67,.74,1.59-1.46,1.69Z" />
          <motion.path className="cls-2" d="M151.01,17.49h0c2.11,.75,3.69,1.63,4.58,2.17-1.34-.83-2.86-1.58-4.59-2.17Z" />
          <motion.path className="cls-7" d="M148.77,57.87c-4.01-1.29-12.08-4.5-14.22-9.99-12.87-7.01-12.47-10.78-12.47-10.78,0-.3,0-.59,0-.89-.14,1.87-.04,4.16,.26,5.81,0,0,1.84,13.84,16.83,17.25,0,0,2.56,.58,5.81,.46,2.21-.47,3.3-1.32,3.79-1.86Z" />
          <motion.path className="cls-3" d="M128.79,23.83c3.31-2,7.77-3.01,11.76-3.52,2.24-1.81,5.91-3.54,11.08-2.15-.27-.37-.6-.65-.62-.67-4.93-1.75-12.68-2.7-20.82,3.46,0,0-7.87,6.15-8.12,15.26,.06-.81,.16-1.54,.31-2.1,2.09-7.71,6.4-10.27,6.4-10.27Z" />
          <motion.path className="cls-3" d="M140.22,38.93s-1.11-.92-2.23-2.5c-2.5,2.95-3.43,5.7-3.43,5.7-.76,2.14-.66,4.05,0,5.75,.11,.06,.21,.12,.32,.17,0,0,15.57,7.02,14.26,9.33,0,0-.09,.2-.36,.49-.49,.54-1.58,1.4-3.79,1.86,.71-.03,1.45-.08,2.2-.19,1.06-.18,2.39-.49,3.87-1.02,3.65-1.31,8.17-3.98,11.5-9.43,0,0-12.16-1.36-22.33-10.17Z" />
          <motion.path className="cls-6" d="M151.63,18.16c1.41,.38,2.92,.99,4.55,1.89-.1-.06-.19-.13-.29-.19-.04-.02-.08-.05-.12-.08-.06-.04-.12-.07-.18-.11-.89-.54-2.48-1.43-4.58-2.17,.02,.01,.35,.3,.62,.67Z" />
          <motion.path className="cls-4" d="M134.55,47.88c-.66-1.7-.76-3.61,0-5.75,0,0,.93-2.75,3.43-5.7-1.96-2.78-3.95-7.62-.08-13.22,0,0,.87-1.47,2.64-2.89-3.99,.51-8.45,1.52-11.76,3.52,0,0-4.31,2.56-6.4,10.27-.15,.56-.25,1.29-.31,2.1,0,.29,0,.59,0,.89,0,0-.41,3.77,12.47,10.78Z" />
          <motion.path className="cls-9" d="M140.68,20.28c-.05,0-.1,.01-.16,.02-1.77,1.43-2.64,2.89-2.64,2.89-3.87,5.61-1.88,10.44,.08,13.22,1.27-1.5,2.96-3.06,5.13-4.33-4.15-.97-5.81-4.29-2.41-11.8Z" />
          <motion.path className="cls-6" d="M289.62,23.68c-4.19,0-7.55-3.37-7.55-7.55s3.37-7.57,7.55-7.57,7.55,3.4,7.55,7.57-3.38,7.55-7.55,7.55Zm0-14.09c-3.56,0-6.49,2.93-6.49,6.54s2.93,6.52,6.49,6.52,6.49-2.93,6.49-6.52-2.93-6.54-6.49-6.54Zm-2.81,1.67c.63-.12,1.57-.21,2.41-.21,1.34,0,2.18,.24,2.79,.8,.49,.44,.75,1.08,.75,1.85,0,1.24-.77,2.08-1.73,2.49,.7,.3,1.12,1.01,1.33,1.97,.31,1.34,.54,2.28,.77,2.69h-1.29c-.16-.3-.38-1.12-.66-2.34-.24-1.33-.77-1.85-1.92-1.88h-1.19v4.22h-1.26V11.26Zm1.26,4.43h1.27c1.31,0,2.18-.75,2.18-1.85,0-1.27-.92-1.78-2.25-1.78-.57,0-.96,.02-1.2,.09v3.54Z" />
        </Logo>
        <Items>
          <Item whileHover={{
            y: -5,
            scale: 1,
            rotate: 0,
            // transition: {
            //   duration: 2
            // }
          }}><Link to="/">홈{homeMath && <Circle layoutId='circle' />}</Link></Item>
          <Item whileHover={{
            y: -5,
            scale: 1,
            rotate: 0,
          }} ><Link to="/series">시리즈{seriesMath && <Circle layoutId='circle' />}</Link></Item>
          <Item><Link to="/movies">영화{moviesMath && <Circle layoutId='circle' />}</Link></Item>
          <Item><Link to="/latest">NEW! 요즘 대세 콘텐츠{latestMath && <Circle />}</Link></Item>
          <Item><Link to="/my-list">내가 찜한 콘텐츠{myListMath && <Circle />}</Link></Item>
          <Item><Link to="/original-audio">언어별로 찾아보기{originalAudioMath && <Circle />}</Link></Item>
        </Items>
      </Col >
      <Col>
        <Search >
          <motion.svg onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></motion.path>
          </motion.svg>
          <Input
            transition={{ type: "linear" }}
            // animate={{ scaleX: searchOpen ? 1 : 0 }}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder="제목, 사람, 장르" />
          <h1>키즈</h1>
          <Notify>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path fillRule="evenodd" clipRule="evenodd" d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z" fill="currentColor">
              </motion.path>
            </svg>
          </Notify>
          {/* <Account /> */}
        </Search>
      </Col>
    </Nav >
  )
}
