import {ReactNode} from "react";


export type GenericModalProps = { handleClose: () => void, isOpen: boolean, title: string, children: ReactNode }

export type LimitedModalProps = Omit<GenericModalProps, "title" | "children">

const GenericModal = ({ handleClose, isOpen, title,children }: GenericModalProps) => {

    if (!isOpen) {
        return <></>
    }

    return <>
        <div className={'modal-wrapper'} onClick={handleClose} />
        <div className={"modal-card"}>
            <button className={'close'} onClick={handleClose}>X</button>
            <h1>{title}</h1>
            {children}
        </div>
    </>
}
export default GenericModal;