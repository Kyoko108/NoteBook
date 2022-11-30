
import NoteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {
  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial);

  //get all notes
  const getNote = async () => {
    const response = await fetch('api/notes/fetchallnotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },

    });

    const json = await response.json();
    setnotes(json)
  }

  //add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch('api/notes/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
 
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  //delete a note
  const deleteNote = async(id) => {
    //a\Api call to delete
    const response = await fetch(`api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },

    });

    const json = await response.json();
    console.log(json)

  //Clint side code
    const newnotes = notes.filter((note) => {
      return id !== note._id
    });
    setnotes(newnotes)
  }

  //edit a note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
   console.log(json)

    let newNote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      let element = newNote[index];
      if(element._id===id){ 
      element.title = title;
      element.description = description;
      element.tag = tag;
      break;
      }
    }
    setnotes(newNote)
  }

  return (
    <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState