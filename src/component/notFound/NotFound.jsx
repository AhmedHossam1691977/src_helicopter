import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <>
  
  <div className="container">
    <div className="row ">
        <div className="col-md-12 text-center notFound">
            <h1 className="text-center  text-black note-found my-3">404 Page Not Found</h1>
            <p className='my-3'>Your visited page not found. You may go home page.</p>
            <Link href="/" className="btn btn-danger my-3 fw-bold">Go Home</Link>
        </div>
    </div>
  </div>

  </>
}
