import {
    X as CloseIcon,
    Captions as TitleIcon,
    ArrowDownNarrowWide as DescriptionIcon,
} from 'lucide-react'
import { type ReactNode, type Ref } from 'react'
import Button from '../ui/Button'
import FormInput from './FormInput'
import { useAppSelector } from '../../store/hooks'
import style from '../../styles/components/form/projectForm.module.scss'

interface ProjectForm {
    handleSubmit: () => void
    handleCloseForm: () => void
    titleId: string
    descriptionId: string
    titleRef: Ref<HTMLInputElement>
    descriptionRef: Ref<HTMLInputElement>
    updateForm?: boolean
    children?: ReactNode
    titleDefaultValue?: string
    descriptionDefaultValue?: string
}

const ProjectForm = ({ handleSubmit, handleCloseForm, titleId, descriptionId, titleRef, descriptionRef, updateForm, children, titleDefaultValue, descriptionDefaultValue }: ProjectForm) => {

    const {loading} = useAppSelector(state => state.project)

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
        }} className={style['form']}>
            <CloseIcon
                strokeWidth={1.7}
                size={20}
                className={style['close-icon']}
                onClick={() => handleCloseForm()}
            />
            <div>
                <FormInput
                    id={titleId}
                    labelText='Title'
                    Icon={TitleIcon}
                    type='text'
                    placeholder='Enter title for project'
                    ref={titleRef}
                    defaultValue={titleDefaultValue}
                    minLength={3}
                    maxLength={50}
                />
                <FormInput
                    id={descriptionId}
                    labelText='Description'
                    Icon={DescriptionIcon}
                    type='text'
                    placeholder='Enter description for project'
                    ref={descriptionRef}
                    defaultValue={descriptionDefaultValue}
                    minLength={10}
                    maxLength={255}
                />
            </div>
            <Button
                name={updateForm? "Update": "Submit"}
                className={style['primary-button']}
                type='submit'
                disabled={loading}
            />
            {
                children
                ?
                children
                :
                null
            }
        </form>
    )

}

export default ProjectForm