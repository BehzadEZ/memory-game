import './SingleCard.css'

export default function SingleCard({card , handleChoise,flipped,disable}) {
    const handleClick = ()=> {
      if (!disable) {
        handleChoise(card)
      }
    }
  return (
    <div className="card">
        <div className={flipped? "flipped":""}>
          <img className='front' src={card.src} alt="card grid" />
          <img className='back'
            onClick={handleClick}
            src="/public/img/cover.png"
            alt="card grid" 
            />
        </div>
    </div>
  )
}
