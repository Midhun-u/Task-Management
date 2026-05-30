import style from '../../styles/components/form/taskForm.module.scss'
import Button from '../ui/Button'
import FormInput from './FormInput'
import {
    CaptionsIcon as TitleIcon,
    X as CloseIcon
} from 'lucide-react'

interface TaskFormProps{
    titleId: string
    updateForm?: boolean
}

const TaskForm = ({titleId, updateForm}: TaskFormProps) => {

    return (
        <form className={style['container']} action="">
            <CloseIcon
                strokeWidth={1.7}
                size={20}
                className={style['close-icon']}
            />
            <FormInput
                id={titleId}
                Icon={TitleIcon}
                labelText='Title'
                type='text'
                placeholder='Enter title'
            />     
            <Button
                name={updateForm? "Update": "Submit"}
            />
        </form>
    )

}

export default TaskForm