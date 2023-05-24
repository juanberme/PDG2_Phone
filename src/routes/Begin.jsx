import { Image } from 'primereact/image';

import { PDGButton } from '../components/PDGButton.js';

import '../styles/beginPage.css';

export default function Begin(){
    return <section className='fullCont'>
        <section className="Logo_CONT">
            <div className="logoImg">
                <Image src='https://upload.wikimedia.org/wikipedia/commons/8/89/Postob%C3%B3n_S._A._logo.svg' alt='logo_Postobon' width='225' />
            </div>
            <div className="logoTxt">
                <h3 className='beginTxt' id='beginSubTitle'>Te invita a conocer</h3>
            </div>
        </section>

        <section className="Title_CONT">
            <h1 className="beginTxt" id='beginTitle'>¿Qué gaseosa eres según tu personalidad?</h1>
        </section>
            
        <section className="Interact_CONT">
            <div className="interactTxt">
                <h3 className="beginTxt" id='beginSubTitle'>Presiona el botón para continuar</h3>
            </div>
            <div className="interactBtn">
                <PDGButton/>
            </div>
        </section>

        <aside className="Deco_CONT_Begin">
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Manzana-Postob%C3%B3n-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Colombiana-La-Nuestra-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Una-Postob%C3%B3n-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2017/08/7UP-350-ml-P-2022.png'/>
            </span>
        </aside>
    </section>
}