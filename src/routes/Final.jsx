import React, {useState, useEffect} from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import { db } from '../components/utils/firebase.js';
import '../styles/FinalPage.css';

export default function Final(){

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [usersData, setUsersData] = useState([]);


    const [userAges, setUserAges] = useState({});
    var userList = [];

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const getUsers = async () => {
            try {
              const userCollection = collection(db, "users");
              const usersSnapshot = await getDocs(userCollection);
      
              usersSnapshot.forEach(doc => {
                userList.push(doc.data());
              });
              setUsersData(userList.map(u => {
                const data = {
                    name: u.name,
                    gender: u.gender[0],
                    age: u.date,
                    email: u.email,
                    tag1: u.tags[0].value,
                    tag2: u.tags[1].value,
                    tag3: u.tags[2].value,
                    tag4: u.tags[3].value,
                };

                //setUserAges(userList);

                return {
                    data
                }
              }));
            } catch(e) {
              console.error(e.message);
            }
          };
      
          getUsers();
          console.log(userList);

        // Obtén las edades de los usuarios

        console.log(usersData);

        // Calcula el recuento de cada rango de edad
        const ages = {
            ageRanges: ['0 a 18', '19 a 30', '31 a 40', '41 a 50', '51 a 60', '61 a 70', 'más de 70'],
            datasets: [{
                label: 'edades',
                data: [userList.date],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                  ],
                  borderWidth: 1
            }]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartData(ages);
        setChartOptions(options);
        /*
        const ageCounts = ageRanges.map(range => ages.filter(age => age === range).length);

        // Crea los datos del gráfico
        const chartData = {
            labels: ageRanges,
            datasets: [
        {
            label: 'Edades',
            data: ageCounts,
            backgroundColor: '#42A5F5', // Color de fondo de las barras
            borderColor: '#1E88E5', // Color del borde de las barras
            borderWidth: 1, // Ancho del borde de las barras
        },],};

        // Opciones del gráfico
        const chartOptions = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0, // Sin decimales en los ejes y
                },
              },
            },
          };
        
        setChartData(chartData);
        setChartOptions(chartOptions);*/

        
  

    }, []);




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
                        <Column field="tag1" header="1er Tag" />
                        <Column field="tag2" header="2do Tag" />
                        <Column field="tag3" header="3er Tag" />
                        <Column field="tag4" header="4to Tag" />
                        <Column field="email" header="correo" />
                    </TreeTable>
                </div>

                <div className='columnChart'>
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
            </section>
        </section>
    </section>
}