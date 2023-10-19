import { read, utils, writeFile } from 'xlsx';

class ExportacaoUtil {
    static Export(json) {
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(json);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFile(wb, "SheetJSReactAoO.xlsx");
    }    
}

export default ExportacaoUtil;