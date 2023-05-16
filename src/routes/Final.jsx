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

        const data = {
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            labels: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16"]
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
        console.log(data);
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
                    {
                        usersData.map((user) => {
                            
                            console.log(user.tags);

                            user.tags.forEach(element =>{
                                var MIBT = "";
                                var count_I = 0;
                                var count_E = 0;
                                var count_N = 0;
                                var count_S = 0;
                                var count_F = 0;
                                var count_T = 0;
                                var count_P = 0;
                                var count_J = 0;

                                if(element.value === "Casero(a)" || element.value === "Tímido(a)" || element.value === "Reservado(a)" || element.value === "Introvertido(a)" || element.value === "Solitario(a)"){
                                    count_I ++;
                                    MIBT += "I";
                                } else if(element.value === "Fiestero(a)" || element.value === "Elocuente" || element.value === "Influenciador(a)" || element.value === "Extrovertido(a)" || element.value === "Amiguero(a)"){
                                    count_E ++;
                                    MIBT += "E";
                                } else if(element.value === "Intuitivo(a)" || element.value === "Flexible" || element.value === "Imaginativo(a)" || element.value === "Distraído(a)" || element.value === "Influenciador(a)"){
                                    count_N ++;
                                    MIBT += "N";
                                } else if(element.value === "Observador(a)" || element.value === "Rígido(a)" || element.value === "Realista" || element.value === "Atento(a)" || element.value === "Reservado(a)"){
                                    count_S ++;
                                    MIBT += "S";
                                } else if(element.value === "Espiritual" || element.value === "Subjetivo(a)" || element.value === "Flexible(a)" || element.value === "Emocional(a)" || element.value === "Caótico(a)"){
                                    count_F ++;
                                    MIBT += "F";
                                } else if(element.value === "Científico(a)" || element.value === "Objetivo(a)" || element.value === "Rígido(a)" || element.value === "Racional" || element.value === "Lógico(a)"){
                                    count_T ++;
                                    MIBT += "T";
                                } else if(element.value === "Distraído(a)" || element.value === "Caótico(a)" || element.value === "Diferente" || element.value === "Esporádico(a)" || element.value === "Improvisador(a)"){
                                    count_P ++;
                                    MIBT += "P";
                                } else if(element.value === "Atento(a)" || element.value === "Ordenado(a)" || element.value === "Moda" || element.value === "Metodológico(a)" || element.value === "Planeador(a)"){
                                    count_J ++;
                                    MIBT += "J";
                                }

                                //setChartData();
                            })
                        })
                    }
                    <Chart type="polarArea" data={chartData} options={chartOptions} id='graph_element'/>
                </div>
            </section>
        </section>
    </section>
}