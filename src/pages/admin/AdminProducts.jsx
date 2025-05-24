import AdminLayout from '../../components/layout/AdminLayout'

const AdminProducts = () => {
  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Products
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Product management interface will be implemented here
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProducts