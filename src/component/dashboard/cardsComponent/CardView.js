import React from 'react'
import Card from './Card'
import './CardView.css'


const CardView = ({ cardDetails }) => {
    return (
        <div className='cardView-container' >
            {cardDetails.map((card => {
                return(
                <div className='cardView' >
                    <Card title={`${card.title}`} count={card.count} color={`${card.color}`} icon={card.icon} />
                </div>
                )
            }))}

        </div>
    )
}

export default CardView
