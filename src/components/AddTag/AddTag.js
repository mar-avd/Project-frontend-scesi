import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import Axios from 'axios';

//render
const user = AuthService.getCurrentUser();
const config = {
    headers: { Authorization: `Bearer ${user.token}` },
};

const createTag = async () => {
    console.log((await Axios.get('http://localhost:2000/tag', config)).data)
}

export default function AddTag() {
    return (
        <div>
            <div>
                <input type="text" placeholder="nameTag" />
            </div>
            <div>
                <div class="row justify-content-end py-3">
                    <div class="col-2">
                        <div class="text-end">
                            <div>
                                <button type="button" class="btn btn-light" onClick={createTag}>
                                    <i class="bi bi-plus-circle-fill">
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
