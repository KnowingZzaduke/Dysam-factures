export interface TypeFormFile {
    idfile: string,
    username: string,
    date: string,
    files: {
        name: File | null;
    }
    statusfile: "Pendiente" | "Verificado"
}