import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useToken } from '../Hooks/useToken';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [signUpError, setSignupError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, googleAuthentication, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const [token] = useToken(createdUserEmail);
    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        setLoading(true);
        if (data.accountType === 'seller') {
            createUser(data.email, data.password)
                .then(res => {
                    handleUpdateUserProfile(data.name);
                    saveSellerInfo(data.name, data.email, data.accountType.toLowerCase());
                    setSignupError('');
                    console.log(res.user);
                })
                .catch(err => {
                    setLoading(false);
                    setSignupError(err.message);
                    console.error(err);
                })
        } else {
            createUser(data.email, data.password)
                .then(res => {
                    handleUpdateUserProfile(data.name);
                    saveBuyerInfo(data.name, data.email, data.accountType.toLowerCase());
                    setSignupError('');
                    console.log(res.user);
                })
                .catch(err => {
                    setLoading(false);
                    setSignupError(err.message);
                    console.error(err);
                })
        }
    };

    //* store seller info
    const saveSellerInfo = (name, email, accountType) => {
        const user = { email, name, role: accountType };
        fetch('https://e-buy-phi.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                toast.success('Sign Up Successfully!');
                setCreatedUserEmail(email);
            })
            .catch(err => {
                setLoading(false);
            })
    };


    const handleUpdateUserProfile = (name) => {
        const userInfo = {
            displayName: name
        }
        updateUserProfile(userInfo)
            .then(() => { })
            .catch(err => console.error(err))
    }

    const handleGoogleSignUp = () => {
        setGoogleLoading(true);
        googleAuthentication()
            .then(res => {
                setCreatedUserEmail(res.user.email);
                saveBuyerInfo(res.user.displayName, res.user.email, 'buyer')
            })
            .catch(err => {
                setGoogleLoading(false);
                console.log(err)
            })
    }

    //* store buyer info
    const saveBuyerInfo = (name, email, accountType) => {
        const user = { email, name, role: accountType };
        fetch('https://e-buy-phi.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setGoogleLoading(false);
                setLoading(false);
                setCreatedUserEmail(email);
                toast.success('Sign Up Successfully!');
                console.log(data)
            })
            .catch(err => {
                setGoogleLoading(false);
                setLoading(false);
            })
    };

    return (
        <section className='lg:py-[100px] md:py-[70px] py-[50px] flex justify-center'>
            <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-7 sm:mx-0 mx-3">
                <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Create an account</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input
                            placeholder='Insert Your Full Name'
                            {...register('name',
                                { required: 'Name is Required' }
                            )}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.name && <p role='alert' className='text-red-500 text-sm'>{errors.name?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">email</label>
                        <input
                            placeholder='Insert Your Email'
                            {...register('email',
                                { required: 'Email is Required' }
                            )}
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.email && <p role='alert' className='text-red-500 text-sm'>{errors.email?.message}</p>}
                        {signUpError && <p className='text-red-500 !mt-0 text-sm'>{signUpError}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">password</label>
                        <input
                            placeholder='Insert Your Password'
                            {...register('password',
                                {
                                    required: 'Password is Required',
                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: ' Minimum eight characters, at least one letter and one number' }
                                }
                            )}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.password && <p role='alert' className='text-red-500 text-sm'>{errors.password?.message}</p>}
                    </div>
                    <p className='pb-2 text-sm font-medium text-gray-900'>What type of account you want?</p>
                    <select {...register('accountType')} className="select select-bordered w-full max-w-xs !mt-0">
                        <option value='seller'>Seller</option>
                        <option selected value='buyer'>Buyer</option>
                    </select>
                    <button type="submit" className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{loading ? 'Loading...' : 'Sign Up'}</button>
                    <div className="text-sm font-medium text-gray-500 !mt-3 text-center">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </form>
                <div>
                    <p className='text-center my-3 font-semibold text-sm'>OR</p>
                </div>
                <div className='text-center'>
                    <button onClick={handleGoogleSignUp} type="button" className="border border-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 hover:bg-gray-700 hover:text-white">
                        <svg
                            className="mr-2 -ml-1 w-4 h-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"><path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        {googleLoading ? 'LOADING...' : 'SIGN UP WITH GOOGLE'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Signup;