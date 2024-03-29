import React from 'react'
import '../styles/Test.css'

export default function TestComponent(props) {
    return (
        <div className='card-container'>
            <img src={props.imagePath} alt="Logo" className='card-image' />
            <div className='card-details'>
                <h1 className='card-title'>{props.name}</h1>
                {props.description ? <p className='card-description'>{props.description}</p>: null}
            </div>
        </div>
    )
}
