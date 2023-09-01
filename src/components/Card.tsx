import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
    backgroundColor: string;
    color: string;
    elevated?: boolean
}

const Card = (props: CardProps) => {
    return <div
        style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            boxShadow: props.elevated ? '2px 2px 5px #00000020' : undefined,
            padding: '1rem'
        }}
    >
        {props.children}
    </div>
}

export default Card