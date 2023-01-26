import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import { useEffect, useState } from 'react';
import useTags from './useTags';

export default function SelectTags({ idNote, tagsInitial }) {
  const [tagsSelected, addTag, deleteTag] = useTags(tagsInitial);
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
  return (
    <div>
      <h4>Cambiar etiquetas:</h4>
      <select className="form-select" onChange={(e) => addTag(e.target.value)}>
        <option defaultValue={'selecciona los tags'}>Selecciona los tags</option>
        {tags.map((tag, index) => {
          return (
            <option
              value={tag.tagID}
              key={index}
            >
              {tag.nameTag}
            </option>
          );
        })}
      </select>
      <div className="my-3">
        { 
        tagsSelected.map((tagSelect, index) => {
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
    </div>
  );
}
