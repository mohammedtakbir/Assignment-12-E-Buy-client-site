import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Signup = () => {
    const [signUpError, setSignupError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(res => {
                setSignupError('');
                toast.success('Sign Up Successfully!');
                console.log(res.user);
            })
            .catch(err => {
                setSignupError(err.message);
                console.error(err);
            })
    };

    const handleGoogleSignUp = () => {

    }

    return (
        <section className='py-[100px] flex justify-center'>
            <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-7">
                <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Sign Up</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input
                            {...register('name',
                                { required: 'Name is Required' }
                            )}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.name && <p role='alert' className='text-red-500 text-sm'>{errors.name?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input
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
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input
                            {...register('password',
                                {
                                    required: 'Password is Required',
                                    minLength: { value: 6, message: 'Password should be at least 6 character' },

                                    //*  Minimum eight characters, at least one letter and one number:
                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: ' Minimum eight characters, at least one letter and one number' }
                                }
                            )}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.password && <p role='alert' className='text-red-500 text-sm'>{errors.password?.message}</p>}
                    </div>
                    <button type="submit" className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
                    <div className="text-sm font-medium text-gray-500 !mt-3 text-center">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </form>
                <div className="divider">OR</div>
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
                        CONTINUE WITH GOOGLE
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Signup;