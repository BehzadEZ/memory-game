import './YouWinPage.css'

export default function YouWinPage({turn, seconds,bestTurns,bestTime}) {
  return (
    <div className="page-win">
      <h1>you win!</h1>
      <h3>count you turn: {turn}</h3>
      <h2>🏆Best Turns: {bestTurns}</h2>
      <h3>you Time is : {seconds}</h3>
      <h2>🏆Best Time: {bestTime} seconds</h2>
    </div>
  )
}
