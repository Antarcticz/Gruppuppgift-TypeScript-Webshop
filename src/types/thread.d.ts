interface Thread {
  id: Key | null | undefined;
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
