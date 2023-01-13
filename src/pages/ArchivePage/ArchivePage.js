export default function ArchivePage(){
    return(
        <div className="py-3">
            <h3>Notas Archivadas</h3>
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
                    <td><button className="btn btn-primary">Desarchivar</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}