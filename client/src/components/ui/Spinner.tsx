import {
    LoaderIcon
} from 'lucide-react'
import style from '../../styles/components/ui/spinner.module.scss'

interface Spinner {
    size?: number
}

const Spinner = ({ size = 25 }: Spinner) => {

    return (
        <LoaderIcon
            size={size}
            className={style['spinner']}
        />
    )

}

export default Spinner