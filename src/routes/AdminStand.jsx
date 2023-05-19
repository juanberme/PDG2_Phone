import React, {useState} from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import '../styles/pruebaPage.css';

const AdminStand = () => {
   //Busqueda
   const [inputSearch, setInputSearch] = useState('');
   const handleSearchInput = (e) => {
   setInputSearch(e.target.value);
   }

   var standList = [
       "S1-Unicentro (Bogotá) Zona A",
       "S1-Unicentro (Bogotá) Zona B",
       "S1-Unicentro (Bogotá) Zona C",
       "S2-Unicentro (Cali) Zona A",
       "S2-Unicentro (Cali) Zona B",
       "S2-Unicentro (Cali) Zona C",
       "S3-Único (Cali) Zona A"
   ];

   return <section className="CLP_CONT">
       <header className="NAV_SUP">
           <nav className="NAV_Home">
               <Button className="btn_link_1" label='Inicio' severity='secondary' text/>
           </nav>

           <nav className="NAV_Link">
               <ul className='LNK_List'>
                   <li className="btn_link">
                       <Button className="btn_link_2" label='Ver stands' severity='secondary' text/>
                   </li>
                   <li className="btn_link">
                       <Button className="btn_link_2" label='Ver estadísticas' severity='secondary' text/>
                   </li>
                   <li className="btn_link">
                       <Button className="btn_link_2" label='Configuraciones' severity='secondary' text/>
                   </li>
               </ul>
           </nav>

           <nav className="NAV_Icon">
               <ul className="ICN_List">
                   <li className="btn_link_3">
                       <Button icon="pi pi-user" aria-label="User"/>
                   </li>
                   <li className="btn_link_3">
                       <Button icon="pi pi-bell" severity="warning" aria-label="Notification"/>
                   </li>
                   <li className="btn_link_3">
                       <Button icon="pi pi-times" severity="danger" aria-label="Cancel"/>
                   </li>
               </ul>
           </nav>
       </header>

       <Divider layout='horizontal'/>

       <section className="SCT_CONT">
           <section className="SCT_INFO">
               <div className="INFO_Deco">
                   <Image src='../gallery/placeholder-image.png' alt='_ERROR_img-CompLogo.svg'/>
               </div>

               <div className="INFO_Company">
                   <span className='Company_Cont'>
                       <h1 className="Ttl_cmp">Nombre de la empresa</h1>
                   </span>
                   <span className="Company_Cont">
                       <h1 className="Sttl_cmp">Tienes 7 stands:</h1>
                   </span>
                   <span className="Company_Cont">
                       <MultiSelect value={inputSearch} onChange={handleSearchInput} filter options={standList} maxSelectedLabels={1}/>
                   </span>
                   <span className="Company_Cont">
                       <Button className='btn_AddStand' label='Agregar' icon="pi pi-plus" iconPos='right'/>
                   </span>
               </div>
           </section>

           <Divider layout='vertical'/>

           <section className="SCT_LIST">
               <span className="LIST_Card">
                   <Card title="Stand: S1-Unicentro" subTitle="Unicentro: Bogotá - Zona A" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S1-Unicentro" subTitle="Unicentro: Bogotá - Zona B" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S1-Unicentro" subTitle="Unicentro: Bogotá - Zona C" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S2-Unicentro" subTitle="Unicentro: Cali - Zona A" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S2-Unicentro" subTitle="Unicentro: Cali - Zona B" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S2-Unicentro" subTitle="Unicentro: Cali - Zona C" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
               <span className="LIST_Card">
                   <Card title="Stand: S3-Único" subTitle="Único: Cali - Zona A" className='md:w-25rem'>
                       <Button className='btn_Card' label='Ver más' icon="pi pi-ellipsis-v" iconPos='right'/>
                   </Card>
               </span>
           </section>
       </section>
   </section>
}

export default AdminStand