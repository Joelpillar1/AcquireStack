
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="50" fill="#FD5C0B" />
    <path
      d="M50,22 C40,50,30,80,28,85 L38,85 C45,65,50,55,50,55 C50,55,55,65,62,85 L72,85 C70,80,60,50,50,22 Z"
      fill="white"
    />
  </svg>
);
