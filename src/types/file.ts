export interface TypeFormFile {
    username: string
    date: string,
    files: {
        name: File | null;
    }
}