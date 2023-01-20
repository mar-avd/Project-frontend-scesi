import { useEffect, useState } from "react"
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';

export default function ArchivePage(){
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    //states
    const [notes, setNotes] = useState([]);
    //init
    useEffect(()=>{
        api.get('note/statusNote?statusNote=archivado', config).then((response) => {
            setNotes(response.data)
        }).catch((error) => console.log(error))
    })
    //handlers
    const handleDesarchivar = (noteID) => {

    }
    //render
    return(
        <div className="py-3">
            <h3>Notas Archivadas</h3>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Ultima modificación</th>
                    <th scope="col"><i className="bi bi-check-square-fill"></i></th>
                </tr>
            </thead>
            <tbody>
                {notes.map((note, index)=>{
                    return(
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{note.titleNote}</td>
                            <td>{note.contentNote.substr(0, 199)}</td>
                            <td>{note.creationDate}</td>
                            <td>{note.modificationDate}</td>
                            <td><button className="btn btn-primary" onClick={handleDesarchivar(note.noteID)}>Desarchivar</button></td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
        </div>
    )
}