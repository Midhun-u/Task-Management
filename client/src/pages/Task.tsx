import { Activity, useCallback, useEffect, useId, useRef, useState, type ChangeEvent } from "react"
import Container from "../components/layout/Container"
import Header from "../components/layout/Header"
import Button from "../components/ui/Button"
import PageDetails from "../components/ui/PageDetails"
import SearchBar from "../components/ui/SearchBar"
import style from '../styles/pages/task.module.scss'
import TaskList from "../components/task/TaskList"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { taskFailed, taskRequest, taskSuccess } from "../store/taskSlice"
import { createTaskApi, getProjectTasksApi } from "../api/taskInstance"
import { useParams } from "react-router"
import Spinner from "../components/ui/Spinner"
import { debounce } from "../utils/debounce"
import TaskForm from "../components/form/TaskForm"
import toast from "react-hot-toast"

const Task = () => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { projectId } = useParams()
    const { loading, tasks } = useAppSelector(state => state.task)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const titleId = useId()
    const titleRef = useRef<HTMLInputElement>(null)

    // Function for getting tasks
    const handleGetTasks = useCallback(async () => {

        if (!projectId) return

        dispatch(taskRequest())

        const result = await getProjectTasksApi(projectId, pagination.page, pagination.limit, searchQuery)
        if (result.success) {

            if (result.data?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            dispatch(taskSuccess({ tasks: result.data, page: pagination.page }))

        } else {
            dispatch(taskFailed({ errorMessage: result.error }))
        }

    }, [projectId, dispatch, pagination.page, pagination.limit, searchQuery])

    const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }, 300)

    // Function for adding task
    const handleAddTask = async () => {

        if (!titleRef.current || !projectId) return

        const result = await createTaskApi({
            projectId: projectId,
            title: titleRef.current.value
        })

        if (result.success) {
            toast.success("Task is created")
            const newTasks = [...tasks, result.data]
            dispatch(taskSuccess({ tasks: newTasks, page: 1 }))
            dialogRef.current?.close()
        } else {
            toast.error(result.error)
            dispatch(taskFailed({ errorMessge: result.error }))
        }

    }

    useEffect(() => {
        (() => {
            handleGetTasks()
        })()
    }, [handleGetTasks])

    return (
        <>
            <Header
            />
            <Container>
                <PageDetails
                    title="Tasks"
                />
                <div className={style['top-section']}>
                    <SearchBar
                        onChange={handleChange}
                        placeholder="Search for tasks"
                    />
                    <Button
                        name="Add Task"
                        className={style['add-button']}
                        onClick={() => dialogRef.current?.showModal()}
                    />
                </div>
                <TaskList
                />
                <Activity mode={hasMore && !loading ? "visible" : "hidden"}>
                    <div className={style['button-container']}>
                        <Button
                            name='Load More'
                            className={style['load-button']}
                            onClick={() => setPagination(pre => {
                                return { ...pre, page: pre.page + 1 }
                            })}
                        />
                    </div>
                </Activity>
                <Activity mode={loading ? "visible" : "hidden"}>
                    <div className={style['spinner-container']}>
                        <Spinner
                            size={22}
                        />
                    </div>
                </Activity>
                <dialog ref={dialogRef} className={style['form-dialog']}>
                    <TaskForm
                        handleSubmit={handleAddTask}
                        onClickOnClose={() => dialogRef.current?.close()}
                        titleId={titleId}
                        titleRef={titleRef}
                    />
                </dialog>
                {
                    tasks.length <= 0
                        ?
                        <div className={style['error-message-container']}>
                            <p className={style['error-message']}>You don't have any tasks</p>
                        </div>
                        :
                        null
                }
            </Container>
        </>
    )

}

export default Task