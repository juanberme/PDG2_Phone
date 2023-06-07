import * as FileSaver from 'file-saver';
import { useCallback } from 'react';
import XLSX from 'sheetjs-style';

import { Button } from 'primereact/button';

const fileType = 'application/octet-stream';

const ExportExcel = ({data, fileName, fileExtension = '.xlsx'}) => {
    const handleExport = useCallback(async () => {
        console.log('EXPORT', data);

        const sheetData = XLSX.utils.json_to_sheet(data);
        const sheet = { Sheets: { 'Datos': sheetData }, SheetNames: ['Datos']};
        const buffer = XLSX.write(sheet, {bookType: 'xlsx', type: 'array'});
        const file = new Blob([buffer], {type: fileExtension});
        FileSaver.saveAs(file, fileName + fileExtension);
    }, [data]);

    return (
        <Button label='Descargar base de datos' onClick={handleExport} severity='success' />
    )
}

export default ExportExcel;