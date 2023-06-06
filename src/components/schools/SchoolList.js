import { useEffect, useState } from 'react'
import { getAllSchools, deleteSchool } from '../../managers/SchoolsManager'
import { useNavigate } from 'react-router-dom'

export const SchoolList = () => {
    const [schools, setSchools] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        refreshSchools()
    }, [])

    const deleteSchool = (event, schoolId) => {
        event.preventDefault()

        deleteSchool(schoolId)
        .then((data) => refreshSchools())
    }

    const refreshSchools = () => {
        getAllSchools()
        .then((schoolArray) => {
            setSchools(schoolArray)
        })
    }
    return (
        <>
        <div>
            <span>Schools</span>
        </div>
        <button
        type='submit'
        onClick={() => navigate('/schools/add')}>
            {' '}
            Add A School{' '}
        </button>
        <article className="school_List">
            {schools.map((school) => {
                return (
                    <section key={`school--${school.id}`}>
                        <div className='card'>
                            
                        </div>
                    </section>
                )
            })}
        </article>
        </>
    )
}