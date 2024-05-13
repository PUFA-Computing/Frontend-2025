import Title from '@/components/admin/Title';
import UserTable from '@/components/admin/UserTable';
import React from 'react';

const UsersPage = () => {
    return (
        <div>
            <Title title='User Table'/>
            <UserTable/>
        </div>
    );
}

export default UsersPage;
