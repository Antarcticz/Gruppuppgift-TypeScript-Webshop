import React, { useState } from 'react'
import './Home.css'
import formData from '../AskForm/AskForm'
import initialFormData from '../AskForm/AskForm'

interface Thread {
  id: number;
  title: string;
  category: string;
  creationDate: string;
  description: string;
}



const Home: React.FC = () => {
  
  const [formData, setFormData] = useState<Thread[]>([]);

  return (
    <div>
        { 


        // formData.map((data) => {
        //   <div>
        //     { data.title}
        //   </div>
        // })
        
         
        // //   formData.map((data) => (
        // //   <div className='card' key={data.id}>
        // //     { data.title } {  }
        // //   </div>
        // // )) 

        
        }
    </div>
  )
}

export default Home