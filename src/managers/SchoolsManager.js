const url = "http://localhost:8000"

export const getAllSchools = () => {
    return fetch(`${url}/schools`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,

        }
    })
    .then((response) => response.json())
}

export const createSchool = (newSchool) => {
    return fetch(`${url}/schools`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSchool),
    })
    .then((response) => response.json())
}

export const deleteSchool = (schoolId) => {
    return fetch(`${url}/schools/${schoolId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
        }
    })
}