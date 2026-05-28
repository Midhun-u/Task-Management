import style from '../../styles/components/ui/searchBar.module.scss'
import {
    SearchIcon
} from 'lucide-react'
import Input from './Input'

const SearchBar = () => {

    return (
        <div className={style['container']}>
            <SearchIcon
                size={20}
                strokeWidth={1.7}
                className={style['icon']}
            />
            <Input
                placeholder='Search Projects'
            />
        </div>
    )

}

export default SearchBar