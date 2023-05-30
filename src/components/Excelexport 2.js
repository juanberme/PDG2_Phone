import * as FileSaver from 'file-saver';
import { useCallback } from 'react';
import XLSX from 'sheetjs-style';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const ExportExcel = ({data, fileName, fileExtension = '.xlsx'}) => {
    const handleExport = useCallback(() => {
        const sheetData = XLSX.utils.json_to_sheet(data);
        const sheet = { Sheets: { data: sheetData }, SheetNames: ['Datos']};
        const buffer = XLSX.write(sheet, {bookType: 'xlsx', type: 'array'});
        const file = new Blob([buffer], {type: fileExtension});
        FileSaver.saveAs(file, fileName + fileExtension);
    }, [data]);

    return (
        <button onClick={handleExport}>
            Exportar a Excel
        </button>
    )
}

export default ExportExcel;