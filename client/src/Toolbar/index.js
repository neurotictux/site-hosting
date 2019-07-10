import React from 'react'
import { FaBars } from 'react-icons/fa'

import { Container } from './styles'

export default function Toolbar() {
  return (
    <Container>
      <FaBars />
      <span>Hosting</span>
    </Container>
  )
}