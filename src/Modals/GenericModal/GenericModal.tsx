export type GenericModalProps = { handleClose: () => void, isOpen: boolean, title: string, children: ReactNode }

const GenericModal = ({ handleClose, isOpen, title }: GenericModalProps) => {

    if (!isOpen) {
        return <></>
    }

    return <>
        <div className={'modalWrapper'} onClick={handleClose} />
        <div className={title.toLowerCase().replaceAll(" ", "-")}>
            <button onClick={handleClose}>X</button>
            <h1>{title}</h1>
        </div>
    </>
}
export default GenericModal;