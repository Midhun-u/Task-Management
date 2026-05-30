import { useId, useRef } from "react"
import { getTaskApi } from "../../api/taskInstance"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { taskFailed, taskRequest, taskSuccess } from "../../store/taskSlice"
import style from '../../styles/components/task/taskList.module.scss'
import TaskCard from "./TaskCard"
import TaskForm from "../form/TaskForm"

const TaskList = () => {

    const { tasks, task } = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()

    // Function for fetching specific task
    const handleGetTask = async (id: string) => {

        dialogRef.current?.showModal()

        dispatch(taskRequest())

        const result = await getTaskApi(id)
        if(result.success){
            dispatch(taskSuccess({task: result.data}))
        }else{
            dispatch(taskFailed({errorMessage: result.error}))
        }

    }

    return (
        <div className={style['container']}>
            {
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        status={task.status}
                        createdAt={task.createdAt}
                        onClickOnCard={() => handleGetTask(task.id)}
                    />
                ))
            }
            <dialog ref={dialogRef} className={style['form-dialog']}>
                <TaskForm
                    titleId={titleId}
                    updateForm
                />
            </dialog>
        </div>
    )

}

export default TaskList