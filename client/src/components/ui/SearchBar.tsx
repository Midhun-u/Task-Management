import style from '../../styles/components/ui/searchBar.module.scss'
import {
    SearchIcon
} from 'lucide-react'
import Input from './Input'
import type { ChangeEvent } from 'react'

interface SearchBarProps{
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

const SearchBar = ({onChange, placeholder}: SearchBarProps) => {

    return (
        <div className={style['container']}>
            <SearchIcon
                size={20}
                strokeWidth={1.7}
                className={style['icon']}
            />
            <Input
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )

}

export default SearchBar