import React, { useState } from 'react';

const AutocompleteInput = (data: any) => {
  const [inputValue, setInputValue] = useState('');

  console.log(data.data.products)

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSelectOption = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="form-control-alternative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        list="options"
        placeholder="Type to autocomplete"
      />
      <datalist id="options">
        {data.data.products.map((product: any) => (
          <option key={product.id} value={product.name} />
        ))}
      </datalist>
      <button onClick={() => setInputValue('')}>Clear</button>
    </div>
  );
};

export default AutocompleteInput;