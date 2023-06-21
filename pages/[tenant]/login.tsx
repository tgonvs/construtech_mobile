import { Header } from '../../components/Header';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';


const Login = (data: Props) => {
  
  const { setToken, setUser } = useAppContext();
  
  const { tenant, setTenant } = useAppContext();
  useEffect(()=> {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setToken('12345');
    setUser({
      name: "Guerlhandi",
      email: 'gguerlandi@gmail.com'
    });
    router.push(`/${data.tenant.slug}`);
  }

  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}`} />

      <div className={styles.header}><img src='/tmp/logo.png' alt="Logo" className={styles.logoImage} /></div>

      <div 
          className={styles.subtitle}
          >Use suas credenciais para realizar login.</div>

      <div className={styles.line}></div>

      <div className={styles.formArea}>

        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            password
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      
      </div>

      <div className={styles.forgetArea}>
        Esqueceu sua senha? <Link href={`/${data.tenant.slug}/forget`}><span>Clique aqui</span></Link>
      </div>

      <div className={styles.line}></div>
      
      <div className={styles.signupArea}>
        <Button
          color={data.tenant.mainColor}
          label="Quero me cadastrar"
          onClick={handleSignUp}
        />
      </div>

    </div>
  );
}

export default Login;

type Props = {
  tenant: Tenant;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if(!tenant) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }

  return {
    props: {
      tenant,
      
    }
  }
}
