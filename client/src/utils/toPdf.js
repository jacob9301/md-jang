import html2pdf from 'html2pdf.js';

import store from '../store';

const generatePDF = () => {

    const elementsToExport = document.getElementById('viewer-container');

    const state = store.getState();
    const fileName = encodeURIComponent(state.currentNote.title + '.pdf');

    const opt = {
        margin:       1,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(elementsToExport).set(opt).save();
};

export default generatePDF;