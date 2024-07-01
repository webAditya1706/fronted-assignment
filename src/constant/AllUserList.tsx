import PageWrapper from '@/componant/PageWrapper';
import RenderTable from '@/componant/RenderTable';
import { GetAllUsersAction } from '@/redux/actions/formAction';
import { UserDataInterface } from '@/types/InterFace';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const AllUserList = () => {
    const tableHeader = ["Id", "User", "Email","Role", "Contact"];
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch();

    const getAllUsers = async () => {
        const { payload } = await dispatch(GetAllUsersAction() as any);
        const users = await payload.map((user: UserDataInterface) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            logo: user.logo,
            contact: user.contact,
            role: user.role
        }))
        setTableData(users)
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <PageWrapper>
            <Col>
                <h2 className='text-center mt-5'>All User List</h2>
                <RenderTable
                    tableHeader={tableHeader}
                    tableData={tableData}
                />
            </Col>
        </PageWrapper>
    );
}

export default AllUserList;
