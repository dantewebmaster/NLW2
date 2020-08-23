import React from 'react';
import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

export interface Teacher {
  id: number;
  subject: string;
  cost: string;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
};

interface TeacherItemProps {
  teacher: Teacher;
  onCreateConnection: Function;
};

const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
  onCreateConnection,
}) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="avatar" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={() => onCreateConnection(teacher.id)}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={WhatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem;
