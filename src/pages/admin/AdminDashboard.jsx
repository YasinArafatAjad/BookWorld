import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <FiPackage className="text-primary-500 text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Manage Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Add, edit, or remove products from the store
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <FiShoppingBag className="text-primary-500 text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Manage Orders
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage customer orders
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}