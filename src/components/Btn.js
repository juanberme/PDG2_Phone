import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

export const AnchorButton = ({onClick, href = '#', ...props}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if(onClick) onClick();

    navigate(href);
  }

  return (
    <Button onClick={handleClick} {...props}/>
  )
}
