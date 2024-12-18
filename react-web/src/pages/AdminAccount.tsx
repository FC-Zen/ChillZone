import React from 'react';
import AdminAccountLayout from '../components/templates/AdminAccountLayout';
import StatCard from '../components/atoms/StatCard';
import TableHeader from '../components/molecules/TableHeader';
import DataTable from '../components/organisms/DataTable';
import { Users, MessageSquare, Package, Percent } from 'lucide-react';

const AdminAccountPage = () => {
  return (
    <div>
      <TableHeader />
      <DataTable />
    </div>
  );
};

export default AdminAccountPage;
