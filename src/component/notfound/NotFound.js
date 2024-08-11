import React from 'react'

const NotFound = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "90%", gap: "10px"}}>
       <h1 >404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Home</a>
    </div>
  )
}

export default NotFound
