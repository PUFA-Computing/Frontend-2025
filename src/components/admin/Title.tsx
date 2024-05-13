import React from 'react'

interface TitleProps{
    title: string;
    bg?: string;
}

function Title({title,bg}:TitleProps) {
  return (
    <h1>{title}</h1>
  )
}

export default Title