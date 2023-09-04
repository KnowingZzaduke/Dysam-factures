export type TypeLoadFile = {
  file: {
    username: string;
    date: string;
    files: {
      name: File | null;
    };
    statusfile: "Pendiente" | "Verificado"
  };
  comment: string;
};
