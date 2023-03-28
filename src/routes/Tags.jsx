import { Tag } from 'primereact/tag';
import { useState } from 'react';
import '../styles/tagPage.css'

export default function Tags(){


    const [value, setValue] = useState('');
   

    const handleClickTag = (option) => {
        setValue(option)
    }

    return <div>
        <p>Escoge las <strong>5 palabras</strong> que más te definen en menos de</p>
        <div className="clock">

        </div>
        <div className="tags">
            <Tag className='tag' onClick={() => handleClickTag("Casero(a)")} value="Casero(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Fiestero(a)")} value="Fiestero(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Tímido(a)")} value="Tímido(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Elocuente(a)")} value="Elocuente(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Reservado(a)")} value="Reservado(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Influenciador(a)")} value="Influenciador(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Introvertido(a)")} value="Introvertido(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Extorvertido(a)")} value="Extorvertido(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Solitario(a)")} value="Solitario(a)" rounded/>
            <Tag className='tag' onClick={() => handleClickTag("Amiguero(a)")} value="Amiguero(a)" rounded/>
        </div>
        <p>Selected option: {value}</p>
    </div>
    
}