interface Thread {
    threadName: ReactNode;
    id: number;
    title: string;
    category: string;
    creationDate: string;
    description: string;
    creator: User
}

interface QNAThread extends Thread {
    category: "QNA";
    isAnswered: boolean;
    commentAnswerId?: number
}
