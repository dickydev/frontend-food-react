import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Filter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState(50);

  const handleFilter = () => {
    onFilter({ category, limit });
  };

  return (
    <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Limit"
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <Button variant="contained" onClick={handleFilter}>
        Apply Filter
      </Button>
    </Box>
  );
};

export default Filter;
