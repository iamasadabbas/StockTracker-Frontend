import React from 'react'
import TestComponent from '../components/TestComponent';
import logo from '../assets/logo512.png';


function Test() {
    return (
        <div className='main-container'>
            <div style={{ display: 'flex', flexWrap: "wrap", border: "2px solid red", justifyContent: "center" }}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <TestComponent
                        key={index}  // Ensure you provide a unique key when rendering a list of components
                        name="John Doe"
                        description="Dummy Name"
                        imagePath={logo}
                    />
                ))}
                <TestComponent
                    name="John Doe"
                    imagePath={logo}
                />
            </div>
        </div>
    )
}

export default Test
