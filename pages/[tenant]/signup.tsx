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
import styles from '../../styles/SignUp.module.css';
import Link from 'next/link';


const SignUp = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  useEffect(()=> {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {

  }

  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/login`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastro | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

      <div className={styles.header}><img src='/tmp/logo.png' alt="Logo" className={styles.logoImage} /></div>

      <div 
          className={styles.subtitle}
          >Preencha os campos para criar o seu cadastro.</div>

      <div className={styles.line}></div>

      <div className={styles.formArea}>

      <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setName}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu nome"
            value={name}
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
            label="Cadastrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      
      </div>

      <div className={styles.forgetArea}>
        Já tem cadastro? <Link href={`/${data.tenant.slug}/login`}><span>Fazer Login</span></Link>
      </div>

    </div>
  );
}

export default SignUp;

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
