import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
const router= useRouter()
useEffect(() => {
    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }
})
    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = { name, email, password };
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();
     if(json){
        setEmail('');
        setPassword('');
        setName('');
        toast.success('successfully sign up', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
    };
}

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit} method='POST' className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <div>
                            <input
                                value={name}
                                onChange={handleChange}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="name"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <input
                                value={email}
                                onChange={handleChange}
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                value={password}
                                onChange={handleChange}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            className="w-full text-center py-3 bg-blue-500 rounded bg-green text-black font-bold hover:bg-green-dark focus:outline-none my-1"
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-pink text-pink" href="../login/">
                            Log in
                        </a>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup
