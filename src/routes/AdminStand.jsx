import React from 'react';
import { Navigate, useNavigate } from 'react-router';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';

import { useAuth } from '../contexts/AuthContext';

import '../styles/adminStandPage.css';
import 'primeicons/primeicons.css';

import logo from '../gallery/postobon-logo.jpg';
import thinkaBeyondLogo from '../gallery/tinkaBeyond-logo_DEF.png';

const AdminStand = () => {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    //Card Config
    const cardHeader = (
        <div>
            <Button className='VSP_cardHeader'/>
        </div>
    );

    if (!currentUser) return <Navigate to="/admin/adminStand"/> ;

    console.log('--- USER ---', currentUser);

   return <section className="VSP_CONT">

        <header className="VSP_HEAD_CONT">
            <nav className="VSP_NAV_Cont">
                <Image src={thinkaBeyondLogo} alt="Image" width="160rem" />
            </nav>
            
            <nav className="VSP_Nav_Cont">
                <span>
                    <Button className='VSP_Nav_Btn' id='BOLD' label='Ver Stands' severity='primary' text />
                </span>

                <span>
                    <Button className='VSP_Nav_Btn' label='Ver Datos' severity='secondary' text onClick={() => navigate('/final')}/>
                </span>

                <span>
                    <Button className='VSP_Nav_Btn' label='Ver Estadísticas' severity='secondary' text onClick={() => navigate('/graficas')}/>
                </span>
            </nav>

            <nav className="Nav_Cont">
                <Button className='VSP_Nav_Btn' id='BOLD' label='Cerrar sesión' severity='danger' text onClick={logout}/>
            </nav>
        </header>

       <div className="DIV_CONT">
        <span>
            <Divider layout='horizontal'/>
        </span>
       </div>

       <main className="VSP_MAIN_CONT">
            <aside className="VSP_Info_Cont">
                <span className="Company_Cont">
                    <img src={logo} alt="logo_Postobon" />
                </span>
                <span className='Company_Cont'>
                    <h1 className="Ttl_cmp">Postobón S.A.</h1>
                </span>
                <span className="Company_Cont">
                    <p className="Sttl_cmp">Tienes 1 stand</p>
                </span>
            </aside>

           <div className="VSP_Div_Cont">
                <span>
                    <Divider layout='vertical'/>
                </span>
           </div>

           <section className="VSP_StandList_Cont">
               <span className="VSP_StandList">
                   <Card title="Stand: Unicentro" subTitle="Unicentro: Cali" header={cardHeader}>
                   </Card>
               </span>
           </section>
       </main>
   </section>
}

export default AdminStand;