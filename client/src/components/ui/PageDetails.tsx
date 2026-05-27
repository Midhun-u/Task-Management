import style from '../../styles/components/ui/pageDetails.module.scss'

interface PageDetailsProps{
    title: string
}

const PageDetails = ({title}: PageDetailsProps) => {

    return (
        <div className={style.container}>
            <h1 className={style.title}>{title}</h1>
        </div>
    )

}

export default PageDetails