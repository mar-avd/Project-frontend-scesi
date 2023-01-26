import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

const useTags = (idNote) => {
  const [tagsNote, setTagsNote] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('noteToTags/tags?noteID=' + idNote, config)
      .then((response) => {
        setTagsNote(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addTag = (newTag) => {
    setTagsNote([...tagsNote, newTag])
  };

  const deleteTag = (tagId) => {
    setTagsNote(tagsNote.filter(tagNote => tagNote.id !== tagId))
  };

  return [tagsNote, addTag, deleteTag];
};

export default useTags;
