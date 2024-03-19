import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginForm from '@/components/loginPage';

export default async function Login() {
    const session = await getServerSession(authOptions);

    if(session) redirect("/dashboard");
    
    return <LoginForm />;
}