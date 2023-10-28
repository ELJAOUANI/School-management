import {Link, Outlet, useNavigate} from "react-router-dom";
import Logo from "../../components/Logo.jsx";
import {LOGIN_ROUTE} from "../../router/index.jsx";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/axios.js";

export default function StudentDashboardLayout() {
    const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate(LOGIN_ROUTE)
    }
    axiosClient.get('/user').then(({data}) => {
      setUser(data)
    })
  }, []);

    return <>
        <header>
            <div
                className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
                <div className="text-2xl text-white font-semibold inline-flex items-center">
                    <Logo/>
                </div>
                <div>
                    <ul className="flex text-white">
                        <li className="ml-5 px-2 py-1">
                            <Link to={'/'}>Home page</Link>
                        </li>
                        <li className="ml-5 px-2 py-1">
                            <Link to={LOGIN_ROUTE}>Logout</Link>
                        </li>
                        <li className="ml-5 px-3 py-1 rounded font-semibold bg-gray-100 text-gray-800"><a href="">DARK
                            MODE</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <main className={'container'}>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
              </thead>
              <tbody>
               <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.id}
                </th>
                <td className="px-6 py-4">
                  {user.name}
                </td>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.created_at}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <Outlet />
        </main>
    </>
}