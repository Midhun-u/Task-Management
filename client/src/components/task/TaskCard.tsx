import style from '../../styles/components/task/taskCard.module.scss'
import { convertIsoDateToFormat } from '../../utils/convertIsoDateToFormal'

interface TaskCardProps {
    title: string
    status: "completed" | "pending"
    createdAt: string
    onClickOnCard: () => void
}

const TaskCard = ({ title, status, createdAt, onClickOnCard }: TaskCardProps) => {

    return (
        <div onClick={onClickOnCard} className={style.container}>
            <h1 className={status === "completed"? style['title-decorated']: style.title}>{title}</h1>
            <p className={style['date']}>{convertIsoDateToFormat(createdAt)}</p>
        </div>
    )

}

export default TaskCard