import style from '../../styles/components/project/projectCard.module.scss'
import {
    PictureInPicture2 as PopUpIcon
} from 'lucide-react'
import { convertIsoDateToFormat } from '../../utils/convertIsoDateToFormal'

interface ProjectCardProps{
    title: string,
    description: string
    createdAt: string
    onClickOnPopUp: () => void
}

const ProjectCard = ({title, description, createdAt, onClickOnPopUp}: ProjectCardProps) => {

    return (
        <div className={style.container}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.description}>{description}</p>
            <PopUpIcon
                size={22}
                strokeWidth={1.7}
                className={style['icon']}
                onClick={(event) => {
                    event.stopPropagation()
                    onClickOnPopUp()
                }}
            />
            <p className={style['date']}>{convertIsoDateToFormat(createdAt)}</p>
        </div>
    )

}

export default ProjectCard