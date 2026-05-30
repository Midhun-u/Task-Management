import { Activity, useCallback, useEffect, useRef, useState, type ChangeEvent } from "react"
import Container from "../components/layout/Container"
import Header from "../components/layout/Header"
import Button from "../components/ui/Button"
import PageDetails from "../components/ui/PageDetails"
import SearchBar from "../components/ui/SearchBar"
import style from '../styles/pages/tasks.module.scss'
import TaskList from "../components/task/TaskList"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { taskFailed, taskRequest, taskSuccess } from "../store/taskSlice"
import { getProjectTasksApi } from "../api/taskInstance"
import { useParams } from "react-router"
import Spinner from "../components/ui/Spinner"
import { debounce } from "../utils/debounce"

const Task = () => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { projectId } = useParams()
    const { loading } = useAppSelector(state => state.task)
    const [searchQuery, setSearchQuery] = useState<string>("")

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
            </Container>
        </>
    )

}

export default Task