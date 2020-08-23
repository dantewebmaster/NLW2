import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import WarningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    const payload = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    };

    api.post('/classes', payload)
      .then(() => {
        alert('Cadastro enviado');
        history.push('/')
      })
      .catch(error => alert(`Erro no cadastro: ${error}`));
  }

  function setScheduleItemValue(
    position: number, field: string, value: string
  ) {
    const updatedShceduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(updatedShceduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher este formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={({ target }) => setAvatar(target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={({ target }) => setWhatsapp(target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={({ target }) => setBio(target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>

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
            <Input
              name="cost"
              label="Custo da sua aula por hora"
              value={cost}
              onChange={({ target }) => setCost(target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button
                type="button"
                onClick={addNewScheduleItem}
              >+ novo horário</button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={
                    ({ target }) => setScheduleItemValue(
                      index, 'week_day', target.value
                    )
                  }
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
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={
                    ({ target }) => setScheduleItemValue(
                      index, 'from', target.value
                    )
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={
                    ({ target }) => setScheduleItemValue(
                      index, 'to', target.value
                    )
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={WarningIcon} alt="alerta" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;
