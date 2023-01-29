import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import EditTagModal from '../../components/EditTagModal/EditTagModal';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [nameTag, setNameTag] = useState('');
  const [editTag, setEditNameTag] = useState('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('tag', config)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  const addTag = () => {
    api
      .post('tag', { nameTag: nameTag }, config)
      .then((response) => {
        console.log(response);
        setNameTag('');
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const editNameTag = (tagID) => {
    api
      .patch(`tag?tagID=${tagID}`, { nameTag: nameTag }, config)
      .then((response) => {
        console.log(response);
        setEditNameTag('');
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  // RENDER
  return (
    <div className="py-3">
      <div className="row pb-3 justify-content-between">
        <div className="col">
          <h3>Mis Etiquetas</h3>
        </div>
        <div className="col-sm-4">
          <form
            className="container"
            onSubmit={(e) => {
              e.preventDefault();
              addTag();
            }}
          >
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de etiqueta"
                required
                onChange={(e) => setNameTag(e.target.value)}
                value={nameTag}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                <i className='bi bi-plus-square-fill'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editNameTag(tag.tagID);
                    }}
                  >
                    <EditTagModal tagID={tag.tagID}></EditTagModal>
                  </form>
                </td>
                <td>
                  <ConfirmDelete elementID={tag.tagID}></ConfirmDelete>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
