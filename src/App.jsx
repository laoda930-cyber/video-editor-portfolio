import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import { experiences, works, strengths } from './data/portfolio'
export default function App() { return <><Header/><main><Hero/><About experiences={experiences}/><Works works={works}/><Strengths strengths={strengths}/></main><Contact/></> }
