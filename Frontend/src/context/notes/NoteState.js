import { useState } from "react";
import NoteContext from "../noteContext";

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial);
      // Add a note
      const addNote=async (title,description,tag)=>{
        // to do : API call
        // API CALL
        
        const response= await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        // console.log(response.json());
        // const json= response.json();
        const note=await response.json();
        setNotes(notes.concat(note));
      }
      // Delete a note 
      const deleteNote=async (id)=>{
        
        // always in react when you want to alter the state then make a copy of it 
        // and create new var/obj/array whatever and then set the state using new variable
        // this helps to prevent from unintended side-effects and ensure correct working of react's reconcillation
        // algo
        const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
        // const json= await response.json();
        if(response.status===200){
            const newNotes=notes.filter((note)=>{ return note._id!==id})
            setNotes(newNotes);
        }else{
            console.log("something went wrong");
        }
        
        // const updateNotes=[...notes];
        // const index=updateNotes.findIndex(note => note._id===id);
        // updateNotes.splice(index,1);
        // setNotes(updateNotes);
        
      }

      const getNotes=async ()=>{
        // API CALL
        
        const response= await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
        const json= await response.json();
        setNotes(json);
        // console.log(json);
      }
      


      // Edit a note
      const editNote=async (id,title,description,tag)=>{
        // API CALL
        
        const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        let newNotes=JSON.parse(JSON.stringify(notes));
        // console.log(response.json())
        // const json= response.json();
        // LOGIC TO EDIT IN CLIENT
        newNotes.forEach(element => {
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
        });
        
        setNotes(newNotes);
        // const json=  response.json();
        
        
      } 
    
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>{props.children}</NoteContext.Provider>
    )
}

export default NoteState;