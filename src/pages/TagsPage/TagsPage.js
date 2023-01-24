import { useEffect, useState } from "react"
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import EditTagModal from "../../components/EditTagModal/EditTagModal";

export default function TagsPage() {
    const [tags, setTags] = useState([]);
    const [nameTag, setNameTag] = useState("");
    const [editTag, setEditNameTag] = useState("");

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

    const addTag = () => {
        api.post('tag', { nameTag: nameTag }, config)
            .then((response) => {
                console.log(response);
                setNameTag("");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const editNameTag = (tagID) => {
        api.patch(`tag?tagID=${tagID}`, { nameTag: nameTag }, config)
            .then((response) => {
                console.log(response);
                setEditNameTag("");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const deleteTag = async (tagID) => {
        api.delete('tag?tagID=' + tagID, config).then(() => {
            window.location.reload()
        }).catch((error) => console.log(error))
    }

    // RENDER
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
                                <td>
                                    <form onSubmit={(e) => { e.preventDefault(); editNameTag(tag.tagID) }}>
                                        {/* <input type="text" className="form-control" placeholder="Nombre de etiqueta"
                                            required onChange={(e) => setEditNameTag(e.target.value)} /> */}
                                        <EditTagModal tagID={tag.tagID}></EditTagModal>
                                    </form>
                                </td>
                                <td><button type="submit" onClick={(e) => (deleteTag(tag.tagID))}>Eliminar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form onSubmit={(e) => { e.preventDefault(); addTag() }}>
                <input type="text" className="form-control" placeholder="Nombre de etiqueta"
                    required onChange={(e) => setNameTag(e.target.value)} value={nameTag} />
                <button type="submit">Agregar etiqueta</button>
            </form>

        </div >
    )
}