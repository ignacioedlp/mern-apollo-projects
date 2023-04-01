import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Home() {
  return (
    <div className='flex-col bg-gray-50'>
      <section className="bg-gray-50">
        <div
          className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Organize your projects?
              <strong className="font-extrabold text-[#DE38A6] sm:block">
                Welcome to ProjectX
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl sm:leading-relaxed">
              It is a service where you can create projects with your categories and create tasks within it.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-[#DE38A6] px-12 py-3 text-sm font-medium text-white shadow hover:[#DE38A6]focus:outline-none focus:ring active:bg-[#DE38A6] sm:w-auto"
                href="/login"
              >
                Get Started
              </Link>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-[#DE38A6] shadow hover:text-[#DE38A6] focus:outline-none focus:ring active:text-[#DE38A6] sm:w-auto"
                href="#about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id='about'>
        <div
          className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div
              className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
            >
              <Image
                alt="Party"
                src="/project.png"
                className="absolute inset-0 h-full w-full object-cover"
                layout="fill"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Create your projects</h2>

              <p className="mt-4 text-gray-600">
                In a simple way you can quickly create a project with a name, description and category.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-block rounded bg-[#DE38A6] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#DE38A6] focus:outline-none focus:ring focus:ring-[#DE38A6]"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div
              className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-first lg:h-full"
            >
              <Image
                alt="Party"
                src="/todo.png"
                className="absolute inset-0 h-full w-full object-cover"
                layout="fill"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Create your tasks</h2>

              <p className="mt-4 text-gray-600">
                Within a project you can create tasks and manage them very easily by dragging and dropping.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-block rounded bg-[#DE38A6] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#DE38A6] focus:outline-none focus:ring focus:ring-[#DE38A6]"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div
              className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
            >
              <Image
                alt="Party"
                src="/profile.png"
                className="absolute inset-0 h-full w-full object-cover"
                layout="fill"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Your own categories</h2>

              <p className="mt-4 text-gray-600">
                You can create and color your categories so you can easily distinguish your projects.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-block rounded bg-[#DE38A6] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#DE38A6] focus:outline-none focus:ring focus:ring-[#DE38A6]"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer aria-label="Site Footer" className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Image src="/logo.png" alt="" className='h-10 w-10' width={40} height={40} />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>

  )
}

export default Home