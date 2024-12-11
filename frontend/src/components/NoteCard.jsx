import React, { useEffect } from 'react'
import {MdCreate, MdDelete, MdOutlinePushPin} from 'react-icons/md';
import moment from "moment"

function NoteCard({
    note,
    onPin,
    onUpdate,
    onDelete
}) {

    const isPinned = false
    return (

    <div className={`border rounded p-4 bg-indigo-50 hover:shadow-xl transition-all ease-in-out`}>
      <div className='flex items-center justify-between'>
        <h6 className='text-sm font-bold'>{note.title}</h6>
        <MdOutlinePushPin className={`icon-btn hover:cursor-pointer ${note.is_pinned?'text-blue-500':'text-slate-400'}`} onClick={() => {onPin(note.id, note.title, note.is_pinned, note.content)}}/>
      </div>
        <span className='text-xs'>{moment(note.created_at).format('Do MMMM  YYYY, h:mm A')} </span>
        <p className='text-xs text-slate-600'>{note.content?.slice(0, 60)}</p>

        <div className='flex items-center justify-between mt-2 float-right'>
            <div className='flex items-center gap-2'>
                <MdCreate className='icon-btn hover:text-green-600 hover:cursor-pointer' onClick={() => onUpdate(note.id, note.title, note.content)} />
                <MdDelete className='icon-btn hover:text-red-600 hover:cursor-pointer' onClick={() => onDelete(note.id)} />
            </div>
        </div>
      
    </div>
  )
}

export default NoteCard