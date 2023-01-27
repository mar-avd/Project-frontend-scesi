import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import { useEffect, useState } from 'react';
import useTags from './useTags';

export default function SelectTags({ idNote, tagsInitial }) {
  const [tagsSelected, addTag, deleteTag, removeTags] = useTags(tagsInitial);
  const [tags, setTags] = useState([]);

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
  //handlers
  const handleTags = () => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    tagsSelected.forEach((tag) => {
      api
        .post('noteToTags', { noteID: idNote, tagID: tag.tagID }, config)
        .catch((error) => console.log(error));
    });
    removeTags.forEach((tag) => {
      api
        .delete('noteToTags', { noteID: idNote, tagID: tag }, config)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
    console.log('ok');
    //console.log('tagsOk', tagsSelected)
  };
  //render
  return (
    <div>
      <h4>Cambiar etiquetas:</h4>
      <select className="form-select" onChange={(e) => addTag(e.target.value)}>
        <option defaultValue={'selecciona los tags'}>Selecciona los tags</option>
        {tags.map((tag, index) => {
          return (
            <option value={tag.tagID} key={index}>
              {tag.nameTag}
            </option>
          );
        })}
      </select>
      <div className="my-3">
        {tagsSelected.map((tagSelect, index) => {
          return (
            <span className="badge text-bg-primary mx-1" key={index}>
              {tagSelect.tags.nameTag}
              <button
                className="btn-close btn-close-white"
                onClick={() => deleteTag(tagSelect.tagID)}
              ></button>
            </span>
          );
        })}
      </div>
      <div className="">
        <button className="btn btn-primary" onClick={handleTags}>
          Confirmar cambios
        </button>
      </div>
    </div>
  );
}
