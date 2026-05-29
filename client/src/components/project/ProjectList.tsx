import { useId, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import style from '../../styles/components/project/projectList.module.scss'
import ProjectCard from './ProjectCard'
import { projectFailed, projectSuccess } from '../../store/projectSlice'
import type { Project } from '../../types/project'
import Button from '../ui/Button'
import { deleteProjectApi, updateProjectApi } from '../../api/projectInstance'
import toast from 'react-hot-toast'
import ProjectForm from '../form/ProjectForm'

const ProjectList = () => {

    const { projects } = useAppSelector(state => state.project)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()
    const descriptionId = useId()
    const dispatch = useAppDispatch()
    const { project } = useAppSelector(state => state.project)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // Function for showing project details and updating 
    const handleShowProjectDetails = (project: Project) => {

        if (!dialogRef.current) return
        dialogRef.current.showModal()

        dispatch(projectSuccess({ project: project }))

    }

    // Function for updating project
    const handleUpdateProject = async () => {

        if (!project || !titleRef.current || !descriptionRef.current) return
        setLoading(true)

        const result = await updateProjectApi(project.id, titleRef.current.value, descriptionRef.current.value)
        if (result.success) {
            dispatch(projectSuccess({ project: result.data }))
            toast.success("Project is updated")
        } else {
            dispatch(projectFailed({ errorMessage: result.error }))
            toast.error(result.error)
        }

        setLoading(false)

    }

    // Function for deleting project
    const handleDeleteProject = async () => {

        if (!project) return

        setLoading(true)

        const result = await deleteProjectApi(project.id)
        if (result.success) {

            const filteredProjects = projects.filter((projectData => projectData.id !== project.id))
            dispatch(projectSuccess({projects: filteredProjects, page: 1}))

            toast.success("Project is deleted")
            dialogRef.current?.close()
            
        } else {
            dispatch(projectFailed({errorMessage: result.error}))
            toast.error("Project is couldn't delete")
        }

        setLoading(false)
    }

    return (
        <div className={style['container']}>
            {
                projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        createdAt={project.createdAt}
                        onClickOnPopUp={() => {
                            handleShowProjectDetails(project)
                        }}
                    />
                ))
            }
            <dialog className={style['popup-dialog']} ref={dialogRef}>
                <ProjectForm
                    handleSubmit={handleUpdateProject}
                    updateForm
                    titleRef={titleRef}
                    descriptionRef={descriptionRef}
                    descriptionId={descriptionId}
                    titleId={titleId}
                    handleCloseForm={() => dialogRef.current?.close()}
                    titleDefaultValue={project?.title}
                    descriptionDefaultValue={project?.description}
                >
                    <Button
                        name='Delete Project'
                        className={style['delete-button']}
                        type='button'
                        disabled={loading}
                        onClick={handleDeleteProject}
                    />
                </ProjectForm>
            </dialog>
        </div>
    )

}

export default ProjectList