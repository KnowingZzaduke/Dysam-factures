function FooterDysam(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    return (
        <div className="bg-dark text-center py-3">
            <span className="text-white">&copy; Dysam {año} </span>
        </div>
    )
}

export default FooterDysam;