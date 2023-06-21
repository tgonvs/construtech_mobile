import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../types/Tenant';
import { useAppContext } from '../../../contexts/AppContext';
import { Product } from '../../../types/Product';
import styles from '../../../styles/Product-id.module.css';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useFormatter } from '@/libs/useFormatter';
import { Quantity } from '@/components/Quantity';

const Product = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [qtCount, setQtCount] = useState(1);
  const [workType, setWorkType] = useState('');
  const [volumeTotal, setVolumeTotal] = useState(1);
  const formatter = useFormatter();

  const handleAddCart = () => {
    const cementQuantity = calculateCementQuantity();
    console.log(`A sua obra precisa de ${cementQuantity} sacos de cimento`);
  };

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  }

  const calculateCementQuantity = () => {
    const cimentoPorMetroCubico = 7; // 1 m³ requer 7 sacos de cimento

    let quantity = 0;
    if (workType === 'Fundação') {
      quantity = volumeTotal * cimentoPorMetroCubico;
    } else if (workType === 'Pilar') {
      quantity = volumeTotal * cimentoPorMetroCubico * 2;
    } else if (workType === 'Viga') {
      quantity = volumeTotal * cimentoPorMetroCubico * 1.5;
    } else if (workType === 'Laje') {
      quantity = volumeTotal * cimentoPorMetroCubico * 2.5;
    }

    return quantity;
  };

  const sugerirOutrosProdutos = () => {
    const produtos = [];
    if (workType === 'Fundação' || workType === 'Pilar' || workType === 'Viga') {
      produtos.push('Areia', 'Brita', 'Concreto');
    }

    return produtos;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>
      <div className={styles.headerArea}>
        <Header
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          invert
        />
      </div>

      <div className={styles.headerBg} style={{ backgroundColor: data.tenant.mainColor }}>

      </div>

      <div className={styles.productImage}>
        <img src={data.product.image} alt="" />
      </div>

      <div className={styles.category}>{data.product.categoryName}</div>
      <div className={styles.title} style={{ borderBottomColor: data.tenant.mainColor }}>{data.product.name}</div>
      <div className={styles.line}></div>

      <div className={styles.description}>{data.product.description}</div>

      <div className={styles.qtText}>Quantidade</div>
      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
            small
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: data.tenant.mainColor }}
        >{formatter.formatPrice(data.product.price)}</div>
      </div>

      <div className={styles.calculationArea}>
        <div>Volume total (m³):</div>
        <input className={styles.input}
          type="number"
          value={volumeTotal}
          onChange={e => setVolumeTotal(Number(e.target.value))}
        />

        <div>Tipo de obra:</div>
        <select className={styles.select} value={workType} onChange={e => setWorkType(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Fundação">Fundação</option>
          <option value="Pilar">Pilar</option>
          <option value="Viga">Viga</option>
          <option value="Laje">Laje</option>
        </select>
        <div className={styles.buttonArea}> 
          <Button 
          color={data.tenant.mainColor} 
          label='Calcular'
          onClick={calculateCementQuantity}
          fill 
          />
        </div>

        {calculateCementQuantity() > 0 && (
          <p className={styles.produto}>A sua obra precisa de {calculateCementQuantity()} sacos de cimento.</p>
        )}

        {workType == 'Fundação' || workType == 'Pilar' || workType == 'Viga' ? (
          <p className={styles.produto}>Esta comprando cimento? Que tal adquirir produtos sugeridos que possam ser necessários com a OKA?
          </p>
        ) : null}

          <div className={styles.produto}>Sugestões de produtos:</div>
          {sugerirOutrosProdutos().map((produto, index) => (
                <div className={styles.produto} key={index}>
                  <label>
                    <input className={styles.checkbox} type="checkbox" />
                    {produto}
                  </label>
                </div>
              ))}
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={data.tenant.mainColor}
          label="Adicionar a sacola"
          onClick={handleAddCart}
          fill
        />
      </div>
    </div>
  );
}

export default Product;

type Props = {
  tenant: Tenant,
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  }

  // Get Product
  const product = await api.getProduct(id as string);

  return {
    props: {
      tenant,
      product
    }
  }
}