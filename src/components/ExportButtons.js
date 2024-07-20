import React from 'react';
import { Button, Box } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import TambahProduct from '../components/TambahProduct';


const ExportButtons = ({ data, handleAddProduct }) => {
    const exportToXML = () => {
        const xmlData = new Blob([JSON.stringify(data)], { type: 'application/xml' });
        saveAs(xmlData, 'products.xml');
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'products.xlsx');
    };

    return (
        <Box display="flex" gap={2} marginBottom={2}>
            <TambahProduct onAddProduct={handleAddProduct} />
            <Button variant="contained" onClick={exportToXML}>
                Export to XML
            </Button>
            <Button variant="contained" onClick={exportToExcel}>
                Export to Excel
            </Button>
        </Box>
    );
};

export default ExportButtons;
