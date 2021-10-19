import React, { useState } from 'react';

type Props = {
  authorization: boolean;
};

export const Success: React.FC<Props> = ({ authorization }) => {
  console.log('Hello you are Success');
  return <h1>Hello - you are in Success</h1>;
};
