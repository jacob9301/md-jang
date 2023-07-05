import store from '../store';

const toTxt = () => {
    const state = store.getState();
    const fileName = encodeURIComponent(state.currentNote.title + '.txt');
    const content = state.currentNote.content;

    const blob = new Blob([content], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    URL.revokeObjectURL(url);
    link.remove();
}

export default toTxt;