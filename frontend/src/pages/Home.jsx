import React from 'react'
import { useState, useEffect } from 'react'
import api from "../api"
// import Note from '../components/Note'
import Modal from 'react-modal'
import { MdAdd } from 'react-icons/md'
import "../styles/Home.css"
import NoteCard from '../components/NoteCard'
import Navbar from '../components/Navbar'

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [openEditNote, setOpenEditNote] = useState(
    {
      isShown: false, 
      type: "add", 
      data: null,
    }
  )

  // Only using this for update
  const [noteId, setNoteId] = useState("")

  const getNotes = () => {
    api.get("/api/notes/").then( (res) => res.data ).then( (data) => {setNotes(data)}).catch( (err) => alert(err))
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}`).then( (res) => {
      if(res.status === 204)  alert("Note Deleted!")
      else  alert("Error occurred while deleting!")
      getNotes()
    })
    .catch( (error) => alert(error))

  }

  const updateNote = (id, title, content) => {
    setTitle(title)
    setContent(content)
    setNoteId(id)
    
    setOpenEditNote(
      {
          isShown: true,
          type: "edit",
          data: null
      }
    )

    console.log(id)
  }

  const pinNote = (id, title, pinned, content) => {
    const is_pinned = !pinned
    api.put(`api/notes/update/${id}`, {title, is_pinned, content}).then( (res) => {
      getNotes()
      if(res.status === 200)  alert(`Note ${is_pinned==true?"pinned!":"unpinned!"}`)
      else  alert("Error occurred while pinning the note!")
    })
    .catch( (error) => alert(error))

    setContent("")
    setTitle("")
    setNoteId("")
  }

  const updateNoteData = (e) => {
    e.preventDefault()
    console.log("To be deleted: ", noteId)
    api.put(`api/notes/update/${noteId}`, {title, content}).then( (res) => {
      getNotes()
      if(res.status === 200)  alert("Note Updated!")
      else  alert("Error occurred while updating!")
    })
    .catch( (error) => alert(error))

    setContent("")
    setTitle("")
    setNoteId("")
    setOpenEditNote(
      {
        isShown: false, 
        type: "add", 
        data: null,
      }
    )

  }

  const createNote = (e) => {
    e.preventDefault()
    api.post("api/notes/", {content, title}).then(
      (res) => {
        if(res.status === 201) alert("Note Created!")
        else  alert("Failed to create note!")
        getNotes()
      }
    )
    .catch( (error) => alert(error))
    
    setOpenEditNote(
      {
        isShown: false, 
        type: "add", 
        data: null,
      }
    )
  }


  useEffect( () => {
      getNotes()
    }
    , [])

  return (
    <div>
    <Navbar />
    <div className='container mx-auto my-auto'>
            <div className='container mx-auto my-auto'>
            <div className='grid grid-cols-3 gap-4 mt-8'>
                {
                  notes.map((note) => (
                    <NoteCard note={note} onUpdate={updateNote} onPin={pinNote} onDelete={deleteNote} key={note.id} />
                  ))
                }
                  
            </div>
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-blue-800 absolute right-10 bottom-10' 
                onClick={() => {
                    setOpenEditNote(
                    {
                        isShown: true,
                        type: "add",
                        data: null
                    }
                    )
            }}>

        <MdAdd className='text-[32px] text-white'/>
      </button>


      <Modal 
        isOpen = {openEditNote.isShown}
        onRequestClose = {() => {}}
        style={
          {
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2"
            },
          }
        }
        contentLabel=''
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
        >
          <form onSubmit={openEditNote.type === "add"?createNote:updateNoteData}>
                <label htmlFor="title" className='font-medium text-black py-2'>Title</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title.length?title:""}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  
                />
                <label htmlFor="content" className='font-medium text-black py-2'>Content</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                >
                {content}
                </textarea>
                <br />
                <input type="submit" value={openEditNote.type==="add"?"Add":"Update"} />
                <input type="submit" value="Close" onClick={ () => {
                  setContent("")
                  setTitle("")
                  setNoteId("")
                setOpenEditNote({
                  isShown: false, 
                  type: "add", 
                  data: null,
                })
              }}></input>
            </form>
        </Modal>

        </div>
    </div>
  )
}

export default Home
