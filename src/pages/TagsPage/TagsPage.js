export default function TagsPage () {
    return(
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Número de referencias</th>
                    <th scope="col">Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Biología</td>
                    <td>Materias relacionadas a biología</td>
                    <td>40</td>
                    <td>01/02/03</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}