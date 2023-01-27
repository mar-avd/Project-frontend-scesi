import { useEffect, useState } from "react"
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

export default function EditTagsNotes({tags, idNote}){
    //states
    const [checkedState, setCheckedState] = useState([]);
    const [tagsNote, setTagsNote] = useState([]);

    const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
    const loadTagsNote = () => {
        api.get('noteToTags/tags?noteID=' + idNote, config).then((response) => {
            let aux = []
            response.data.forEach(item => {
              aux.push(item.tagID);
            });
            setTagsNote(aux);
          }).catch((error) => console.log(error))
    }
    useEffect(() => {
        loadTagsNote();
        tags.forEach(tag => {
            //
        })
    })

    //handlers
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => 
          index === position ? !item : item
        )
        setCheckedState(updatedCheckedState);
    }
    //render
    return (<>
        {tags.map((tag, index) => {
            return(
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={tag.nameTag}
                    defaulChecked={tag.isChecked}
                    id={'defaultCheck' + index}
                    onChange={() => handleOnChange(index)}
                  />
                  <label className="form-check-label" htmlFor={'defaultCheck' + index}>
                    {tag.nameTag}
                  </label>
                </div>
            )
        })}
    </>)
}