import Container from "../components/ui/Container"
import Header from "../components/layout/Header"
import PageDetails from "../components/ui/PageDetails"
import SearchBar from "../components/ui/SearchBar"
import style from '../styles/pages/home.module.scss'
import Button from "../components/ui/Button"

const Home = () => {

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
                        />
                        <Button
                            name="Add Project"
                            className={style['add-button']}
                        />
                    </div>
                </>
            </Container>
        </>
    )

}

export default Home