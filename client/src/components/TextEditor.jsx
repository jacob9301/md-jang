import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { marked } from 'marked';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentNote } from '../actions/currentNoteActions';


//for the warnings
marked.use({
  headerIds: false,
  mangle: false
});

function TextEditor() {

  const currentNoteContent = useSelector(state => state.currentNote.content);
  const currentNoteId = useSelector(state => state.currentNote.id);
  const dispatch = useDispatch();

  const handleTextChange = (event) => {
    dispatch(updateCurrentNote(event.target.value));
  }

  return (
    <>
        <div className="editor-container">
            <Form.Control className='editor' as="textarea" disabled={currentNoteId == '' ? true : false} onChange={handleTextChange} value={currentNoteContent} />
        </div>
        <div id="viewer-container" className="viewer-container" dangerouslySetInnerHTML={{ __html: marked.parse(currentNoteContent) }}></div>
    </>
  );
}

export default TextEditor;