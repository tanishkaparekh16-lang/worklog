import React from 'react'
import { GameProvider, useGame } from './state/progress'
import { Grain, Toast } from './components/ui'
import Boot from './scenes/Boot'
import MainMenu from './scenes/MainMenu'
import Story from './scenes/Story'
import Arcade from './scenes/Arcade'
import { Ch1, Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch8, Ch9, Ch10 } from './scenes/chapters'
import { Milestone } from './scenes/milestones'
import { EggCafe, Extras, Final, Letter, Soundtrack, Stats, Tapes, WorldMap } from './scenes/collection'

function Router() {
  const { route } = useGame()
  if (/^r[1-9]$/.test(route)) return <Milestone id={route} />
  switch (route) {
    case 'boot': return <Boot />
    case 'menu': return <MainMenu />
    case 'story': return <Story />
    case 'ch1': return <Ch1 />
    case 'ch2': return <Ch2 />
    case 'ch3': return <Ch3 />
    case 'ch4': return <Ch4 />
    case 'ch5': return <Ch5 />
    case 'ch6': return <Ch6 />
    case 'ch7': return <Ch7 />
    case 'ch8': return <Ch8 />
    case 'ch9': return <Ch9 />
    case 'ch10': return <Ch10 />
    case 'final': return <Final />
    case 'arcade': return <Arcade />
    case 'ost': return <Soundtrack />
    case 'tapes': return <Tapes />
    case 'stats': return <Stats />
    case 'map': return <WorldMap />
    case 'letter': return <Letter />
    case 'extras': return <Extras />
    case 'egg-cafe': return <EggCafe />
    default: return <MainMenu />
  }
}

export default function App() {
  return (
    <GameProvider>
      <Grain />
      <Toast />
      {/* key forces a clean fade-in per scene */}
      <RouteKeyed />
    </GameProvider>
  )
}

function RouteKeyed() {
  const { route } = useGame()
  return <div key={route}><Router /></div>
}
