export type TypeLoadFile = {
  file: {
    idfile: string
    username: string;
    date: string;
    files: {
      name: File | null;
    };
  };
  comment: string;
};
