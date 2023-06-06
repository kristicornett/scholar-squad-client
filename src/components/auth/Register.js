import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../managers/AuthManager'
import { getAllSchools } from '../../managers/SchoolsManager'


 
export const Register = ({ setToken }) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const school = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()
    const [schools, setSchools] = useState([])
    const [schoolName, setSchoolName] = useState({
        name: '',
        school: '',
        teacher: ''
    })

    const handleRegister = (event) => {
        event.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                school: school.current.value
            }

            registerUser(newUser)
            .then(response => {
                if (response.token) {
                    navigate('/')
                }
            })
        } else {
            passwordDialog.current.showModal()
        }
    }

    useEffect(() => {
        getAllSchools()
        .then((data) => {
            setSchools(data)
        })
    })

      //don't feel this is right and need help
      const updateSchoolName = (event) => {
        const copy = { ...school }
        copy.school.name = parseInt(event.target.value)
        setSchoolName(copy)
      }




    return (
        <section>
            <form onSubmit={handleRegister}>
                <h1 className='title'>Scholar Squad</h1>
                <p className='subtitle'>Create An Account</p>
                <div className='field'>
                    <label className='label'>First Name</label>
                    <div>
                        <input className='input' type='text' ref={firstName} />
                    </div>
                </div>
                <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>
        <select className="form-select" ref={school} required onChange={updateSchoolName}>
                          <option>Please select...</option>
                          {schoolName.map((school) => {
                            return (
                              <option key={school.id} value={school.id}>
                                {school.name}
                              </option>
                            )
                          })}
                        </select>
            </form>
        </section>
    )
}
