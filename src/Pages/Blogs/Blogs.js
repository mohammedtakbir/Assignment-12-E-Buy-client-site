import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
        <>
            <section className="">
                <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                    <h2 className='text-center sm:text-4xl text-3xl font-semibold mt-5'>FAQ</h2>
                    <div className="grid justify-center grid-cols-1 gap-6 lg:grid-cols-2">
                        <Link rel="noopener noreferrer" href="#" className="mx-auto group hover:no-underline focus:no-underline">
                            <img alt='/' role="presentation" className="object-cover w-full rounded h-[280px]" src="https://cdn.educba.com/academy/wp-content/uploads/2021/02/React-State-Management.jpg" />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">What are the different ways to manage a state in a React application?</h3>
                                <span className="text-xs">November 05, 2022</span>
                                <div>
                                    <h3 className='font-semibold'>The Four Kinds of React State to Manage.</h3>
                                    <div className='mb-3'>
                                        <h4 className='font-semibold'>1. Local state: </h4>
                                        <p className='text-sm mb-1'>Local state is most often managed in React using the useState hook. </p>
                                        <p className='text-sm mb-1'>For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.</p>
                                    </div>
                                    <div className='mb-3'>
                                        <h4 className='font-semibold'>2. Global (UI) state: </h4>
                                        <p className='text-sm mb-1'>Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.</p>
                                        <p className='text-sm mb-1'>A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.</p>
                                        <p>Sometimes state we think should be local might become global.</p>
                                    </div>
                                    <div className='mb-3'>
                                        <h4 className='font-semibold'>3. Server state: </h4>
                                        <p className='text-sm mb-1'>Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.</p>
                                        <p className='text-sm mb-1'>There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.</p>
                                        <p className='text-sm mb-1'>Fortunately there are tools such as SWR and React Query that make managing server state much easier.</p>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold'>4. URL state: </h4>
                                        <p>Data that exists on our URLs, including the pathname and query parameters.</p>
                                        <p className='text-sm mb-1'>URL state is often missing as a category of state, but it is an important one.
                                            In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link rel="noopener noreferrer" href="#" className="mx-auto group hover:no-underline focus:no-underline">
                            <img alt='/' role="presentation" className="object-cover w-full rounded h-[280px]" src="https://res.cloudinary.com/practicaldev/image/fetch/s--9b17TTej--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/yjxz6x93jaxk4wgmpnw5.png" />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">How does prototypical inheritance work?</h3>
                                <span className="text-xs">November 19, 2022</span>
                                <div className='text-sm'>
                                    <p className='mb-1'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects.</p>
                                    <p className='mb-1'>It is <strong>a method by which an object can inherit the properties and methods of another object.</strong></p>
                                    <p className='mb-1'>Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                                    <img src="https://www.educative.io/api/page/6187859468877824/image/download/6346760642363392" alt="" />
                                    <p className='mb-1'>All JavaScript objects inherit properties and methods from a prototype:</p>
                                    <p className='mb-1'>Date objects inherit from Date.prototype.</p>
                                    <p className='mb-1'>Array objects inherit from Array.prototype.</p>
                                    <p className='mb-3'>Player objects inherit from Player.prototype.</p>
                                    <p className='mb-1'>The Object.prototype is on top of the prototype inheritance chain. ​ Date objects, Array objects, and Player objects all inherit from Object.prototype.</p>
                                </div>
                            </div>
                        </Link>
                        <Link rel="noopener noreferrer" href="#" className="mx-auto group hover:no-underline focus:no-underline">
                            <img alt='/' role="presentation" className="object-cover w-full rounded h-[280px]" src="https://blog.autify.com/static/4df2b67866357dcd03c1adfdb5a0a0d6/what-is-unit-testing-min.jpg" />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">What is a unit test? Why should we write unit tests?</h3>
                                <span className="text-xs">November 07, 2022</span>
                                <div>
                                    <div className='mb-3'>
                                        <h4 className='font-semibold mb-3'>What is a unit test?</h4>
                                        <p className='text-sm'>A unit test is <strong>a way of testing a unit - the smallest piece of code that can be logically isolated in a system.</strong></p>
                                        <p className='text-sm mb-1'>In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.</p>
                                        <p className="text-sm">In computer programming, unit testing is a software testing method by which individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.</p>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold'> Why should we write unit tests?</h4>
                                        <p className='text-sm mb-1'>Unit testing ensures that all code meets quality standards before it's deployed.</p>
                                        <p className='text-sm mb-1'>This ensures a reliable engineering environment where quality is paramount</p>
                                        <p className='text-sm mb-1'>Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link rel="noopener noreferrer" href="#" className="mx-auto group hover:no-underline focus:no-underline">
                            <img alt='/' role="presentation" className="object-cover w-full rounded h-[280px]" src="https://www.educative.io/v2api/editorpage/5436540852371456/image/4965476405870592" />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">React vs. Angular vs. Vue?</h3>
                                <span className="text-xs">November 10, 2022</span>
                                <div>
                                    <h4 className='font-medium'>Angular </h4>
                                    <p className="text-sm">
                                        Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as:
                                    </p>
                                    <i className='block font-bold mt-1'>“The modern web developer’s platform”</i>
                                    <p className="text-sm">
                                        Angular (also referred to as "Angular 2+") is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.
                                    </p>
                                </div>
                                <div>
                                    <h4 className='font-medium'>React</h4>
                                    <p className="text-sm">
                                        React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.
                                    </p>
                                </div>
                                <div>
                                    <h4 className='font-medium'>Vue </h4>
                                    <p className="text-sm">
                                        Vue.js (commonly referred to as Vue; pronounced "view") is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.
                                    </p>
                                </div>
                            </div>
                        </Link>

                    </div>
                    <div className="flex justify-center">
                        <button type="button" className="px-6 py-3 text-sm rounded-md hover:underline">Load more posts...</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blogs;