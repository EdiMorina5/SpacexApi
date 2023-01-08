import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <ul>
        <li>
            <Link to="/" className="px-4 py-2 rounded-lg bg-blue-500 text-white">Back</Link>
        </li>
    </ul>
  )
}
