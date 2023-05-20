import React, {useState, useEffect} from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

import { db } from '../components/utils/firebase.js';
import '../styles/FinalPage.css';

export default function Final(){

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [genderChart, setGenderChart] = useState({});
    const [genderChartOptions, setenderChartOption] = useState({});
    

    const [usersData, setUsersData] = useState([]);
    const [userGenderData, setUserGenderData] = useState([]);

    const [genderCounter, setGenderCounter] = useState([])

    var userList = [];
    var userGender = [];

    console.log(usersData);
    console.log(userGenderData);


    useEffect(() => {
        const getUsers = () => {
          try {
            const userCollection = collection(db, "users");
            const unsubscribe = onSnapshot(userCollection, (snapshot) => {
                const updatedUsersData = snapshot.docs.map((doc) => doc.data());
                const updatedUserGender = snapshot.docs.map((doc) => doc.data().gender);
                //setUsersData(updatedUsersData);   
                setUserGenderData(updatedUserGender);
                setUsersData(updatedUsersData.map(u => {
                    const data = {
                        name: u.name,
                        gender: u.gender,
                        age: u.date,
                        email: u.email,
                        tag1: u.tags[0].value,
                        tag2: u.tags[1].value,
                        tag3: u.tags[2].value,
                        tag4: u.tags[3].value,
                    };
    
                    return {
                        data
                    }
                })); 

                const userGenderData = ['Male', 'Female', 'Prefer not to say'];
                setGenderCounter(userGenderData);

                
            });
            return unsubscribe;
          } catch (e) {
            console.error(e.message);
          }
        };
      
        const unsubscribe = getUsers();
      
        return () => {
          // Cancelar la suscripción al salir del componente
          unsubscribe();
        };
        
      }, []);      

    const countGender = gender => {
        return genderCounter.filter(g => g === gender).length;
    };
   /*const documentStyle = getComputedStyle(document.documentElement);
            const data = {
            labels: ['Hombre', 'Mujer', 'Prefiero no decirlo'],
            datasets: [
                {
                    data: [
                        countGender('Male'),
                        countGender('Female'),
                        countGender('Prefer not to say')
                    ],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
        ]
    };
    const options = {
        cutout: '60%'
    };
            
    setGenderChart(data);
    setenderChartOption(options);*/

    
    console.log(userList);
    console.log(userGender);
    //console.log(countGender);
    //console.log(userAgeData);




    return <section className='FNL_CONT'>
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

            </section>

            <Divider layout='vertical'/>

            <section className="SCT_GRAPH">
                <div className="card">
                        <TreeTable value={usersData}>
                            <Column field="name" header="Nombre" />
                            <Column field="gender" header="Gender" />
                            <Column field="age" header="Edad" />
                            <Column field='tag1' header="1er tag" />
                            <Column field='tag2' header="2do tag" />
                            <Column field='tag3' header="3er tag" />
                            <Column field='tag4' header="4to tag" />
                            <Column field='email' header="Correo"/>
                        </TreeTable>
                </div>

                <div className='columnChart'>
                    
                <h3>Hombres: {countGender('Hombre')}</h3>
                <h3>Mujeres: {countGender('Mujer')}</h3>
                <h3>Prefiero no decirlo: {countGender('Prefiero no decirlo')}</h3>
                </div>
            </section>
        </section>
    </section>
}