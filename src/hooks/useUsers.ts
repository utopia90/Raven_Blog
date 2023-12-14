import React, { useState, useEffect } from 'react';
import  { User,getAllUsers } from '../services/services'


function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers() as User[];
                setUsers(usersData);
            } catch (error) {
                setError(error as string)
            }
            finally {
                setLoading(false)
            }
        };
        fetchUsers();
    }, []);

    return {users, loading, error}
}
function useUsersId(){
    const  {users, loading: loadingUserIds, error: usersIdError} = useUsers()

    const userIds: number[] = users?.map((user) => user.id)

    return {userIds, loadingUserIds, usersIdError}
}
function useUsersName(){
    const  {users} = useUsers()

    const userIds: string[] = users?.map((user) => user.name)

    return {userIds}
}
function useGetUserNameById(userId: number){
    const   {users, loading: loadingUserName, error: userNameError} = useUsers()

    const user = users?.find(({id}) => id === userId)
    const userName = user?.name

    return {userName, loadingUserName, userNameError}
}
export  {useUsers, useUsersId,useUsersName,useGetUserNameById};
