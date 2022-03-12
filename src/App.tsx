import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DUMMY_NOTES from './dummy_notes';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';
import { json } from 'stream/consumers';
function App() {
  const updateNoteItem = (updatedNote: INote) => {
    const updateList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id)
        return updatedNote
      return noteItem
    });
    console.log(updateList)
    setNotesList(updateList)
  }
  const [notesList, setNotesList] = useState<INote[]>([])
  useEffect(() => {
    const notesListFromStorageString = localStorage.getItem('my-notes');
    if (notesListFromStorageString) {
      const notesListFromStorageArray = JSON.parse(notesListFromStorageString);
      setNotesList(notesListFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES)
    }
  }, []);
  useEffect(() => {
    const notesStringList = JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesStringList);
  }, [notesList])
  console.log('Rerendering the list')
  console.log(notesList)
  return (
    <div className="App">
      <div><h2>Notes Header</h2></div>
      {/* <div><button onClick={getNotes}>Click Me</button></div> */}
      {/* <div>
        <h4>{notesList[0]?.text}</h4>
        <h4>{notesList[0]?.link}</h4>
      </div> */}
      <div className="notes-list">
        {notesList.map((noteItem, index) => {
          // return (
          //   <div key={index}>
          //     <h4>{noteItem?.text}</h4>
          //     <p>{noteItem?.link}</p>
          //   </div>
          // );
          return <Note note={noteItem} onNoteUpdaet={updateNoteItem} key={index} />
        })}
      </div>
    </div>
  );
}

export default App;

