import { useEffect, useState } from "react"
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import { type } from "@testing-library/user-event/dist/type";

export default function TagsPage() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        api.get('tag', config).then((response) => {
            setTags(response.data)
        }).catch((error) => console.log(error))
    }, []);

    const user = AuthService.getCurrentUser();
    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    const addTag = async (nameTag) => {
        api.post('tag', { nameTag: nameTag }, config).
            then((response) => {
                console.log(response.data)
                return response.data;
            });
    }

    const deleteTag = async (tagID) => {
        api.delete('tag?tagID=' + tagID, config).then(() => {
            window.location.reload()
        }).catch((error) => console.log(error))
    }

    return (
        <div className="py-3">
            <h3>Mis Etiquetas</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Editar etiqueta</th>
                        <th scope="col">Eliminar etiqueta</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{tag.nameTag}</td>
                                <td><button type="submit">Editar</button></td>
                                <td><button type="submit" onClick={(e)=>(deleteTag(tag.tagID))}>Eliminar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form onSubmit={async (e) => { e.preventDefault() }}>
                <input id="inputNameTag" type="text" placeholder="nameTag" />
                <button onClick={() => { console.log("Hola mundo") }} type="submit">Agregar nota</button>
            </form>

        </div >
    )
}