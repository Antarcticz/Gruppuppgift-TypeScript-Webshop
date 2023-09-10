interface Thread {
  uid:'';
  id: number;
    title: string;
    category: string;
    creationDate: string;
    description: string;
    creator: {
        uid: string;
        displayName: string;
  };
  comments: string[];
}

interface QNAThread extends Thread {
    category: "QNA";
    isAnswered: boolean;
    commentAnswerId?: number
}
