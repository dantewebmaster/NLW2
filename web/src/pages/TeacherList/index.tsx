import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';

import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function handleSearchTeachers(event: FormEvent) {
    event.preventDefault();

    const params = {
      subject,
      week_day: weekDay,
      time,
    };
    console.log(params)

    const response = await api.get('/classes', { params });

    setTeachers(response.data);

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os Proffys disponíveis">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={({ target }) => setSubject(target.value)}
            options={[
              { label: 'Artes', value: 'Artes' },
              { label: 'Biologia', value: 'Biologia' },
              { label: 'Ciências', value: 'Ciências' },
              { label: 'Educação física', value: 'Educação física' },
              { label: 'Programação', value: 'Programação' },
              { label: 'Matemática', value: 'Matemática' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={weekDay}
            onChange={({ target }) => setWeekDay(target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda' },
              { value: '2', label: 'Terça' },
              { value: '3', label: 'Quarta' },
              { value: '4', label: 'Quinta' },
              { value: '5', label: 'Sexta' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={({ target }) => setTime(target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            teacher={teacher}
            onCreateConnection={(e: any) => console.log(e)}
          />
        ))}
      </main>
    </div>
  )
}

export default TeacherList;
