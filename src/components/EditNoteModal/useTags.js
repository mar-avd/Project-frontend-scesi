import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

const useTags = (tagsInitial) => {
  const [tagsNote, setTagsNote] = useState(tagsInitial);
  const [removeTags,setRemoveTags] = useState([]);

  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  /*useEffect(() => {
    api
      .get('noteToTags/tags?noteID=' + idNote, config)
      .then((response) => {
        setTagsNote(response.data);
      })
      .catch((error) => console.log(error));
  }, []);*/

  const addTag = (newTagID) => {
    //console.log(tagsNote.find(tagN => tagN.tagID !== newTagID))
    api.get('tag/findOne?tagID='+newTagID, config).then((response) => {
        const newTag = {tagID: newTagID, tags:response.data}
        setTagsNote([...tagsNote, newTag])
        console.log('newTags', tagsNote);
    }).catch((error) => console.log(error))
    /*if(tagsNote.filter(tagN => tagN.tagID !== newTagID)){

    }*/
  };

  const deleteTag = (tagId) => {
    setRemoveTags([...removeTags, tagId])
      setTagsNote(tagsNote.filter(tagNote => tagNote.tagID !== tagId))
      console.log(tagsNote);
  };

  return [tagsNote, addTag, deleteTag, removeTags];
};

export default useTags;
