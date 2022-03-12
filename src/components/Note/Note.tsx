import React, { FC, useEffect, useState, FocusEvent } from 'react';
import { updateNonNullChain } from 'typescript';
import INote from '../../interfaces/note.interface';
import './Note.css';
type Props = {
    note: INote
    onNoteUpdaet: (note: INote) => void;
}

const Note: FC<Props> = ({ note, onNoteUpdaet }) => {
    const noteTextUpdate = (event: FocusEvent<HTMLDivElement>) => {
        // console.log(event.currentTarget.textContent)
        const newTextValue = event.currentTarget.textContent
        if (newTextValue === note.text) {
            return;
        }
        const updatedNoteObject: INote = {
            ...note,
            text: newTextValue || ''
        };
        onNoteUpdaet(updatedNoteObject)
    }
    return (
        <div className='note'>
            <div contentEditable={true} suppressContentEditableWarning={true}
                // onInput={noteTextUpdate}
                onBlur={noteTextUpdate}
                // onFocus={noteTextInputFocus}
                className='note__text'>{note.text}</div>
            <div className='note__link'><a href={note.link}>{note.link}</a>
            </div>
        </div>
    );
}
export default Note;
