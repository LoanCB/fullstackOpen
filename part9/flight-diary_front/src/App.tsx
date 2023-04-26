import {SyntheticEvent, useEffect, useState} from 'react';
import {Diary, Visibility, Weather} from './types';
import {createDiary, getAllDiaries} from './services/diaries';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const diaryCreation = async (event: SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      visibility: visibility,
      weather: weather,
      date: date,
      comment: comment
    };
    try {
      const data = await createDiary(diaryToAdd);
      setDiaries(diaries.concat(data));
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data)
        setError(error.response.data);
      else
        setError(error as string);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <fieldset>
          <legend>Visibility</legend>
          {Object.keys(Visibility).map(key => (
            <label key={key}>
              {key}
              <input type="radio" value={key} id={key} name="visibility" onChange={({target}) => setVisibility(target.value as Visibility)}/>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather</legend>
          {Object.keys(Weather).map(key => (
            <label key={key}>
              {key}
              <input type="radio" value={key} name="weather" onChange={({target}) => setWeather(target.value as Weather)}/>
            </label>
          ))}
        </fieldset>
        <div>
          comment
          <input type="text" value={comment} onChange={({target}) => setComment(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
