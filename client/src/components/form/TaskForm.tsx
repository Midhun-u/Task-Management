import type { ReactNode, Ref } from 'react'
import style from '../../styles/components/form/taskForm.module.scss'
import Button from '../ui/Button'
import FormInput from './FormInput'
import {
    CaptionsIcon as TitleIcon,
    X as CloseIcon
} from 'lucide-react'
import { useAppSelector } from '../../store/hooks'

interface TaskFormProps{
    titleId: string
    updateForm?: boolean
    handleSubmit: () => void
    titleRef: Ref<HTMLInputElement>
    defaultValue?: string
    children?: ReactNode
    onClickOnClose: () => void
}

const TaskForm = ({titleId, updateForm, handleSubmit, titleRef, defaultValue, children, onClickOnClose}: TaskFormProps) => {

    const {loading} = useAppSelector(state => state.task)

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
        }} className={style['container']} action="">
            <CloseIcon
                strokeWidth={1.7}
                size={20}
                className={style['close-icon']}
                onClick={onClickOnClose}
            />
            <FormInput
                id={titleId}
                Icon={TitleIcon}
                labelText='Title'
                type='text'
                placeholder='Enter title'
                ref={titleRef}
                defaultValue={defaultValue}
                minLength={3}
                maxLength={50}
            />     
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

export default TaskForm