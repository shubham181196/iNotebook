import { useContext } from 'react';
import noteContext from '../context/noteContext';

const Noteitem =(props)=>{
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const {note,updateNote}=props;
    return(
        <div className="col-md-3">
            <div className="card my-3" style={{width: "18rem"}}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title"> {note.title}</h5>
                <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully","success");}}/>
                <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}/>
            </div>
                <p className="card-text">{note.description}</p> 
            </div>
        </div>
           
            
        </div>
    )
}

export default Noteitem