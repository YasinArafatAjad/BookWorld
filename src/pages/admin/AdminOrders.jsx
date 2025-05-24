import AdminLayout from '../../components/layout/AdminLayout'

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Orders
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Order management interface will be implemented here
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminOrders