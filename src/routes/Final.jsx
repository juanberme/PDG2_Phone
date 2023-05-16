import React, {useState, useEffect} from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import { db } from '../components/utils/firebase.js';
import '../styles/FinalPage.css';

export default function Final(){

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [usersData, setUsersData] = useState([]);

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
              setUsersData(userList);
            } catch(e) {
              console.error(e.message);
            }
          };
      
          getUsers();
          console.log(usersData);

        const data = {
            datasets: [
                {
                    data: [10, 10, 20, 10, 10, 20, 10],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                    ],
                    label: 'My dataset'
                }
            ],
            labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue', 'Orange', 'Purple']
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
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
                    <Chart type="polarArea" data={chartData} options={chartOptions} id='graph_element'/>
                </div>
            </section>
        </section>
    </section>
}