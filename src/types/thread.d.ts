export interface Thread {
  id?: Key | null | undefined;
  title: string;
  category: string;
  creationDate: string;
  description: string;
  threadName?: string;
  creator: {
    uid: string;
    displayName: string;
    email?: string;
    name?: string;
    password?: string;
    userName?: string;
  };
  comments: string[] | string; // Om 'comments' kan vara en sträng
}

interface QNAThread extends Thread {
    category: "QNA";
    isAnswered: boolean;
    commentAnswerId?: number
}

