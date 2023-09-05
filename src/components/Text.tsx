//Import textbased props for paragraph
import { HtmlHTMLAttributes } from "react";

interface TextProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
    highlightedWord?: string;
    children: string;
    onClickHiglightedWord?: (e: React.MouseEvent<HTMLElement>) => void
}

const Text = (props: TextProps) => {
    // const [highlightClicCounter, setHighlightClickCounter] = useState(0)
    const words = props.children.split(" ");
    const highlightedWord = props.highlightedWord || "";
    const highlightedWordIndex = words.findIndex(
        word => word.toLowerCase().includes(
            highlightedWord.toLowerCase()
        )
    );
    return <p {...props}>
        {words.map((word, index) => {
            if (index === highlightedWordIndex) {
                return <strong onClick={props.onClickHiglightedWord}
                >{word} </strong>
            }
            return `${word} `

        })}
    </p>
}

export default Text