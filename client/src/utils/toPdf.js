import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

import store from '../store';

const generatePDF = () => {

    const elementsToExport = document.getElementById('viewer-container');

    const state = store.getState();
    const fileName = encodeURIComponent(state.currentNote.title + '.pdf');

    const opt = {
        margin:       [0,0],
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { dpi: 192, letterRendering: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const doc = new jsPDF(opt.jsPDF);
    const pageSize = jsPDF.getPageSize(opt.jsPDF);

    const pageImage = await html2pdf().from(page).set(opt).outputImg();

    doc.addImage(pageImage.src, 'jpeg', opt.margin[0], opt.margin[1], pageSize.width, pageSize.height);

    doc.save(fileName);
};

export default generatePDF;