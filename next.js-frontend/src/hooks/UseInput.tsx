'use client';

import { useState } from 'react';

const UseInput = () => {
  const [value, setValue] = useState<string>();

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return { onChange, value, clear };
};

export default UseInput;
