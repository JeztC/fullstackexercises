import {useField} from "../hooks/hooks";
import {LOGIN} from "../queries/queries";
import {useMutation} from "@apollo/client";
import {useEffect} from "react";

const LoginForm = ({show, setToken, setError, setPage}) => {
    const username = useField('text')
    const password = useField('text')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() =>
        {
            if (result.data) {
                const token = result.data.login.value
                setToken(token)
                console.log(token)
                localStorage.setItem('library-user-token', token)
            }
        }, [result.data]
    )

    if (!show) {
        return null
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await login({variables : {username : username.value, password : password.value}})
            username.setValue('')
            password.setValue('')
            setPage('authors')
        } catch (exception) {
            setError(exception.data)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <h2>Log in to application</h2>
                Username <input
                {...username}
            />
            </div>
            <div>
                Password <input
                {...password}
                type={"password"}
            />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm