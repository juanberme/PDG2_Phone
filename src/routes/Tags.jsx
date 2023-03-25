import { Tag } from 'primereact/tag';
import '../styles/tagPage.css'

export default function Tags(){
    return <div>
        <p>Escoge las <strong>5 palabras</strong> que más te definen en menos de</p>
        <div className="clock">

        </div>
        <div className="tags">
            <Tag className='tag' value="Casero(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Fiestero(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Tímido(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Elocuente(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Reservado(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Influenciador(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Introvertido(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Extorvertido(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Solitario(a)" rounded/>
            <Tag className='tag' style={{padding: '12px'}} value="Amiguero(a)" rounded/>
        </div>
    </div>
    
}