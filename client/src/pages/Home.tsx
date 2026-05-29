import Container from "../components/layout/Container"
import Header from "../components/layout/Header"
import PageDetails from "../components/ui/PageDetails"
import SearchBar from "../components/ui/SearchBar"
import style from '../styles/pages/home.module.scss'
import Button from "../components/ui/Button"
import { Activity, useCallback, useEffect, useId, useRef, useState, type ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { projectFailed, projectRequest, projectSuccess } from "../store/projectSlice"
import { addProjectApi, getProjectsApi } from "../api/projectInstance"
import ProjectList from "../components/project/ProjectList"
import Spinner from "../components/ui/Spinner"
import { debounce } from "../utils/debounce"
import toast from "react-hot-toast"
import ProjectForm from "../components/form/ProjectForm"

const Home = () => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { loading } = useAppSelector(state => state.project)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const dispatch = useAppDispatch()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const titleId = useId()
    const descriptionId = useId()
    const { projects } = useAppSelector(state => state.project)

    // Function for getting project
    const handleGetProjects = useCallback(async () => {

        dispatch(projectRequest())
        const result = await getProjectsApi(pagination.page, pagination.limit, searchQuery)
        if (result.success) {
            if (result.data?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            dispatch(projectSuccess({ projects: result.data, page: pagination.page }))
        } else {
            dispatch(projectFailed({ errorMessage: result.error }))
        }

    }, [pagination.page, pagination.limit, dispatch, searchQuery])

    const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }, 300)

    // Function for adding new project
    const handleSubmitProject = async () => {

        if (!titleRef.current || !descriptionRef.current) return

        dispatch(projectRequest())

        const result = await addProjectApi({ title: titleRef.current.value, description: descriptionRef.current.value })
        if (result.success) {
            toast.success("Project is addedd")
            const newProjects = [...projects, result.data]
            dispatch(projectSuccess({ projects: newProjects, page: 1 }))
            dialogRef.current?.close()
        } else {
            toast.error(result.error)
            dispatch(projectFailed({ errorMessage: result.error }))
        }

    }

    useEffect(() => {
        (() => {
            handleGetProjects()
        })()
    }, [handleGetProjects])

    return (
        <>
            <Header
            />
            <Container>
                <>
                    <PageDetails
                        title="Projects"
                    />
                    <div className={style['top-section']}>
                        <SearchBar
                            onChange={handleChange}
                        />
                        <Button
                            name="Add Project"
                            className={style['add-button']}
                            onClick={() => dialogRef.current?.showModal()}
                        />
                    </div>
                    <ProjectList
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
                </>
                <dialog ref={dialogRef} className={style['form-dialog']}>
                    <ProjectForm
                        descriptionId={descriptionId}
                        descriptionRef={descriptionRef}
                        handleCloseForm={() => dialogRef.current?.close()}
                        handleSubmit={handleSubmitProject}
                        titleId={titleId}
                        titleRef={titleRef}
                    />
                </dialog>
                {
                    projects.length <= 0
                        ?
                        <div className={style['error-message-container']}>
                            <p className={style['error-message']}>You don't have any projects</p>
                        </div>
                        :
                        null
                }
            </Container>
        </>
    )

}

export default Home