import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ page, count, onChange, variant, color }) => {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={(e, value) => onChange(value)}
            variant={variant}
            color={color}
        />
    );
};

export default PaginationComponent;
