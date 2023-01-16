export default function Login(){
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-6">
                <h1 className="text-center">Notes</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control"/>
                            
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control"/>

                        </div>
                    </form>
                    <div className="d-grid gap-2 d-md-block text-center">
                        <button className="btn btn-primary">Iniciar Sesión</button>
                        <button className="btn btn-secondary">Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    )
}