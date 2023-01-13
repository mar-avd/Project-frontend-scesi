export default function TrashPage(){
    return(<div>
        <h3>Papelera</h3>
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
                <tr>
                    <th scope="row">1</th>
                    <td>Biología</td>
                    <td>Materias relacionadas a biología</td>
                    <td>40</td>
                    <td>01/02/03</td>
                    <td>
                        <div>
                        <button className="btn btn-secondary">Recuperar</button>
                    <button className="btn btn-primary">Eliminar</button>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>)
}