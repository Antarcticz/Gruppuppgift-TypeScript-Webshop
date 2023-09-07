import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

interface SortingButtonProps {
    onSort: (option: string) => void;
  }

  const SortingButton: React.FC<SortingButtonProps> = ({ onSort }) => {
  const [selectedOption, setSelectedOption] = useState('newest');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); // Update the selected option in state
    onSort(option); // Calling provided onSort function with the selected option
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Sorted by: {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleOptionChange('newest')}>Newest</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionChange('latest')}>Latest</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortingButton;
