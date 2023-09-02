export type TypeLoadFile = {
  file: {
    idfile: string
    username: string;
    date: string;
    files: {
      name: File | null;
    };
    statusfile: "Pendiente" | "Verificado"
  };
  comment: string;
};
