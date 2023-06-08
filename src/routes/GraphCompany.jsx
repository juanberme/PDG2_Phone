import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Image } from 'primereact/image';
/* import ReactExport from "react-export-excel"; */

import { db } from '../components/utils/firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';
import ExportExcel from '../components/Excelexport.js';
import { useAuth } from '../contexts/AuthContext.js';

import '../styles/graphCompanyPage.css';
import 'primeicons/primeicons.css';

import thinkaBeyondLogo from '../gallery/tinkaBeyond-logo_DEF.png';

const GraphCompany = () => {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    //const [chartData, setChartData] = useState({});
    //const [chartOptions, setChartOptions] = useState({});
    const [genderChart, setGenderChart] = useState({});
    const [genderChartOptions, setGenderChartOption] = useState({});

    //const [tagsChart, setTagsChart] = useState({});
    //const [tagsChartOptions, setTagsChartOptiones] = useState({});

    const [tags1, setTags1] = useState({});
    const [tagsChart1, setTagsChart1] = useState({});
    const [tagsChartOptions1, setTagsChartOptiones1] = useState({});

    const [tags2, setTags2] = useState({});
    const [tagsChart2, setTagsChart2] = useState({});
    const [tagsChartOptions2, setTagsChartOptiones2] = useState({});

    const [tags3, setTags3] = useState({});
    const [tagsChart3, setTagsChart3] = useState({});
    const [tagsChartOptions3, setTagsChartOptiones3] = useState({});

    const [tags4, setTags4] = useState({});
    const [tagsChart4, setTagsChart4] = useState({});
    const [tagsChartOptions4, setTagsChartOptiones4] = useState({});
    

    const [usersData, setUsersData] = useState([]);
    const [userGenderData, setUserGenderData] = useState([]);

    //const [genderCounter, setGenderCounter] = useState([])

    //var userList = [];
    //var userGender = [];

    //console.log('---- USERS DATA -----');
    //console.log(usersData);
    //console.log(userGenderData);

useEffect(() => {
    const getUsers = () => {
        try {
        const userCollection = collection(db, "users");
        const unsubscribe = onSnapshot(userCollection, (snapshot) => {
            const updatedUsersData = snapshot.docs.map((doc) => doc.data());
            //const updatedUserGender = snapshot.docs.map((doc) => doc.data().gender);
            //setUsersData(updatedUsersData);   
            setUserGenderData(updatedUsersData.filter(u => u.tags?.length === 4).map(u => u.gender));
            setTagsChart1(updatedUsersData.filter(u => u.tags?.length === 4).map(u => u.tags[0].value));
            setTagsChart2(updatedUsersData.filter(u => u.tags?.length === 4).map(u => u.tags[1].value));
            setTagsChart3(updatedUsersData.filter(u => u.tags?.length === 4).map(u => u.tags[2].value));
            setTagsChart4(updatedUsersData.filter(u => u.tags?.length === 4).map(u => u.tags[3].value));
            setUsersData(updatedUsersData.filter(u => u.tags?.length === 4).map(u => {
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

            //const userGenderData = ['Male', 'Female', 'Prefer not to say'];
            //setGenderCounter(userGenderData);
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


//console.log(tagsChart4);
//console.log(userGenderData);
    
//genero
useEffect(() => {
    const countGender = gender => {
        if(userGenderData && userGenderData.length > 0) {
            return userGenderData.filter(g => g === gender).length;
        }
    };

    const generateGenderChart = () => {
        const documentStyle = getComputedStyle(document.documentElement);
            const data = {
                labels: ['Hombre', 'Mujer', 'No binario'],
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
    setGenderChartOption(options);
    }
    generateGenderChart();

}, [userGenderData]);


//---------
//tags1
useEffect(() => {
    const tags1Counter = tag1 => {
        if(tagsChart1 && tagsChart1.length > 0){
            return tagsChart1.filter(tg1 => tg1 === tag1).length;
        }
    }

    const data = {
        labels: ["Responsable", "Fiestero(a)", "Introvertido(a)", "Burletero(a)"],
        datasets: [
            {
                label: 'Sales',
                data: [
                    tags1Counter("Responsable"),
                    tags1Counter("Fiestero(a)"),
                    tags1Counter("Introvertido(a)"),
                    tags1Counter("Burletero(a)")
                ],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    setTags1(data);
    setTagsChartOptiones1(options);
}, [tagsChart1]);

//---------
//tags2
useEffect(() => {
    const tags2Counter = tag2 => {
        if(tagsChart2 && tagsChart2.length > 0){
            return tagsChart2.filter(tg2 => tg2 === tag2).length;
        }
    }

    const data = {
        labels: ["Solidario(a)", "Vago(a)", "Independiente", "Sociable"],
        datasets: [
            {
                label: 'Sales',
                data: [
                    tags2Counter("Solidario(a)"),
                    tags2Counter("Vago(a)"),
                    tags2Counter("Independiente"),
                    tags2Counter("Sociable")
                ],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    setTags2(data);
    setTagsChartOptiones2(options);
}, [tagsChart2]);

//---------
//tags3
useEffect(() => {
    const tags3Counter = tag3 => {
        if(tagsChart3 && tagsChart3.length > 0){
            return tagsChart3.filter(tg3 => tg3 === tag3).length;
        }
    }

    const data = {
        labels: ["Soltero", "Coqueto", "Indiferente", "Privado(a)"],
        datasets: [
            {
                label: 'Sales',
                data: [
                    tags3Counter("Soltero"),
                    tags3Counter("Coqueto"),
                    tags3Counter("Indiferente"),
                    tags3Counter("Privado(a)")
                ],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    setTags3(data);
    setTagsChartOptiones3(options);
}, [tagsChart3]);

//---------
//tags4
useEffect(() => {
    const tags4Counter = tag4 => {
        if(tagsChart4 && tagsChart4.length > 0){
            return tagsChart4.filter(tg4 => tg4 === tag4).length;
        }
    }
    

    const data = {
        labels: ["Colaborador", "Arriesgado", "Metódico", "Optimista"],
        datasets: [
            {
                label: 'Sales',
                data: [
                    tags4Counter("Colaborador"),
                    tags4Counter("Arriesgado"),
                    tags4Counter("Metódico"),
                    tags4Counter("Optimista")
                ],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    setTags4(data);
    setTagsChartOptiones4(options);
}, [tagsChart3]);

if (!currentUser) return <Navigate to="/admin/graficas"/> ;

console.log('--- USER ---', currentUser);

    return <section className="VEP_CONT">
        <header className="VEP_HEAD_CONT">
            <nav className="VEP_NAV_Cont">
                <Image src={thinkaBeyondLogo} alt="Image" width="160rem" />
            </nav>
            
            <nav className="VEP_Nav_Cont">
                <span>
                    <Button id='BOLD' label='Ver Stands' severity='primary' text />
                </span>

                <span>
                    <Button label='Ver Datos' severity='secondary' text onClick={() => navigate('/final')} />
                </span>

                <span>
                    <Button label='Ver Estadísticas' severity='secondary' text />
                </span>
            </nav>

            <nav className="Nav_Cont">
                <Button id='BOLD' label='Cerrar sesión' severity='danger' text onClick={logout}/>
            </nav>
        </header>

        <div className="VEP_Div_Cont">
        <span>
            <Divider layout='horizontal'/>
        </span>
       </div>

       <section className='VEP_Graph_Cont'>
            <div className='VEP_Graph_Element'>
                {userGenderData.length > 0 ? (
                    <><Chart type="doughnut" data={genderChart} options={genderChartOptions} className="w-full md:w-30rem"/>
                    </>
                ) : (
                    <ProgressSpinner />
                )}
            </div>
            <div className='VEP_Graph_Element'>
                {tagsChart1.length > 0 ? (
                    <><Chart type="bar" data={tags1} options={tagsChartOptions1} />
                    </>
                ) : (
                    <ProgressSpinner />
                )}
                
            </div>
            <div className='VEP_Graph_Element'>
                {tagsChart2.length > 0 ? (
                    <><Chart type="bar" data={tags2} options={tagsChartOptions2} />
                    </>
                ) : (
                    <ProgressSpinner />
                )}
                
            </div>
            <div className='VEP_Graph_Element'>
                {tagsChart3.length > 0 ? (
                    <><Chart type="bar" data={tags3} options={tagsChartOptions3} />
                    </>
                ) : (
                    <ProgressSpinner />
                )}
                
            </div>
            <div className='VEP_Graph_Element'>
                {tagsChart4.length > 0 ? (
                    <><Chart type="bar" data={tags4} options={tagsChartOptions4} />
                    </>
                ) : (
                    <ProgressSpinner />
                )}
                
            </div>

            <div className="VEP_Div_Cont">
                <span>
                    <Divider layout='horizontal'/>
                </span>
            </div>

            <section className="VEP_Excel_Cont">
                <div className='columnChart'>
                    <ExportExcel data={usersData.map(u => u.data)} fileName={`users-data-${Date.now()}`}/>
                </div>
            </section>
        </section>
    </section>
}

export default GraphCompany;