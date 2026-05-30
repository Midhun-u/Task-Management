import { useId, useRef } from "react"
import { deleteTaskApi, getTaskApi, updateTaskApi } from "../../api/taskInstance"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { taskFailed, taskRequest, taskSuccess } from "../../store/taskSlice"
import style from '../../styles/components/task/taskList.module.scss'
import TaskCard from "./TaskCard"
import TaskForm from "../form/TaskForm"
import Button from "../ui/Button"
import toast from "react-hot-toast"

const TaskList = () => {

    const { tasks, task, loading } = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()
    const titleRef = useRef<HTMLInputElement>(null)

    // Function for fetching specific task
    const handleGetTask = async (id: string) => {

        dialogRef.current?.showModal()

        dispatch(taskRequest())

        const result = await getTaskApi(id)
        if (result.success) {
            dispatch(taskSuccess({ task: result.data }))
        } else {
            dispatch(taskFailed({ errorMessage: result.error }))
        }

    }

    // Function for submitting form
    const handleSubmit = async () => {

        if(!task) return

        dispatch(taskRequest())
        
        const result = await updateTaskApi(task.id, {title: titleRef.current?.value})
        if(result.success){

            toast.success("Task is updated")
            dispatch(taskSuccess({task: result.data}))

        }else{
            toast.error("Task is couldn't update")
            dispatch(taskFailed({errorMessage: result.error}))
        }

    }

    // Function for marking task as complete
    const handleMarkAsComplete = async () => {

        if(!task) return

        dispatch(taskRequest())

        const result = await updateTaskApi(task.id, {status: task.status === "completed"? "pending": "completed"})
        if(result.success){
            dialogRef.current?.close()
            dispatch(taskSuccess({task: result.data}))
            toast.success("Task is updated")
        }else{ 
            toast.error(result.error)
            dispatch(taskFailed({errorMessage: result.error}))
        }

    }

    // Function for deleting task
    const handleDeleteTask = async () => {

        if(!task) return

        dispatch(taskRequest())

        const result = await deleteTaskApi(task.id)
        if(result.success){
            dialogRef.current?.close()
            const filteredTasks = tasks.filter(taskData => taskData.id !== task.id)
            dispatch(taskSuccess({tasks: filteredTasks, page: 1}))
            toast.success("Task is deleted")
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
                    handleSubmit={handleSubmit}
                    titleRef={titleRef}
                    defaultValue={task?.title}
                    onClickOnClose={() => {
                        dispatch(taskSuccess({task: null}))
                        dialogRef.current?.close()
                    }}
                >
                    <Button
                        name={task?.status === "completed"? "Mark as incomplete": "Mark as complete"}
                        className={style['secondary-button']}
                        disabled={loading}
                        type="button"
                        onClick={handleMarkAsComplete}
                    />
                    <Button
                        name="Delete"
                        className={style['secondary-button']}
                        disabled={loading}
                        type="button"
                        onClick={handleDeleteTask}
                    />
                </TaskForm>
            </dialog>
        </div>
    )

}

export default TaskList