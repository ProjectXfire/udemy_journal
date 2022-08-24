export interface INote {
  id: string;
  title: string;
  body: string;
  imageURL: string;
  imageId: string;
  createdAt: number;
}

export interface ICreateNoteDto {
  title: string;
  body: string;
  imageURL: string;
  imageId: string;
  createdAt: number;
}

export interface IUpdateNoteDto {
  title: string;
  body: string;
}
