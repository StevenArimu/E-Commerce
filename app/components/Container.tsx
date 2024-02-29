import { FC, ReactNode } from "react";
interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
            {children}
        </div>
    );
}

export default Container;