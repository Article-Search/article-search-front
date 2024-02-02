import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/Context/authContext'; // adjust the import path to match your file structure

export default function isAuth(Component: any, role:number ) {
    return function IsAuth(props: any) {
        const { user,loading } = useContext(AuthContext);
        const router = useRouter();

        console.log('current user: ', user)
        useEffect(() => {
            console.log(user);
            if (!loading && (!user || (role !== 0 && user.role !== role))) {
                router.push('/login');
            }
        }, [user, loading]);// added route just to avoid the warning

        if (loading || !user || (role !== 0 && user.role !== role)) {
            return null;
        }

        return <Component {...props} />;
    };
}
