export type TypeLoadFile = {
  file: {
    username: string;
    date: string;
    files: {
      name: File | null;
    };
  };
  comment: string;
};
